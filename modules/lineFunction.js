var models = require('../models');
var axios = require('axios')

module.exports = {
    insertLine(data, idzone){
        return new Promise(function (resolve, reject) {
            models.Line.findOrCreate({
                where: {name: data.legs[0].line},
                defaults:
                        {name: data.legs[0].line,
                        fromStation: data.from,
                        toStation: data.to,
                        idZone: idzone}
            }).then(function (line) {
                if(line == null)
                {
                    resolve(null)
                }
                resolve(line[0].dataValues)
            })
        })
    },

    deleteLine(idzone){
        return new Promise(function (resolve, reject) {
            models.Line.destroy({
                where:{idZone: idzone  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    updateLine(body){
        return new Promise(function (resolve, reject) {
            models.Line.update(
                {   name: body.name,
                    fromStation: body.fromStation,
                    toStation: body.toStation,
                    idZone: body.id_zone},
                {   where: {id_line: body.id_line}
                }).then(function (line) {
                if(line == null)
                {
                    resolve(null)
                }
                resolve(line.dataValues)
            })
        })
    },
    GetAllLine(id_zone) {
        return new Promise(function (resolve, reject) {
            models.Line.findAll({
                where: {idZone: id_zone}
            }).then(function (line) {
                resolve(line)
            })
        })
    },
    GetOneLine(idline) {
        return new Promise(function (resolve, reject) {
            models.Line.findOne({
                where: {id_line: idline},
                include: [{
                    model: models.Line_Station,
                    as: 'line_tab',
                    include:[{
                        model: models.Station,
                        as: 'station_tab'
                    }]
                }]
            }).then(function (line) {
                if(line == null)
                {
                    resolve(null)
                }
                resolve(line.dataValues)
            })
        })
    },
    APILine(line) {
        return new Promise(function (resolve, reject) {
            axios.get('https://timetable.search.ch/api/route.en.json?from='+line.fromStation+'&to='+line.toStation+'&num=1').then(function (response) {
                console.log(response.data);
                resolve(response.data)
                })
        }).catch(function (error) {
            console.log(error)
        })
    }
}

