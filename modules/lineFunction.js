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
                resolve(line[0].dataValues)
            })
        })
    },

    deleteLine(idline){
        return new Promise(function (resolve, reject) {
            models.Line.destroy({
                where:{id_line: idline  }
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
                resolve(line.dataValues)
            })
        })
    },    GetOneLineByName(name) {
        return new Promise(function (resolve, reject) {
            models.Line.findOne({
                where: {name: name}
            }).then(function (line) {
                resolve(line.dataValues)
            })
        })
    },
    APILine(body) {
        return new Promise(function (resolve, reject) {
            axios.get('https://timetable.search.ch/api/route.en.json?from='+body.fromStation+'&to='+body.toStation+'&num=1').then(function (response) {
                console.log(response.data);
                resolve(response.data)
                })
        }).catch(function (error) {
            console.log(error)
        })
    },
    APISearch(body) {
        return new Promise(function (resolve, reject) {
            axios.get('https://timetable.search.ch/api/route.en.json?from='+body.from+'&to='+body.to+'&num=25&pre=-1&time=06:00&date='+body.date).then(function (response) {
                console.log(response.data);
                resolve(response.data)
            })
        }).catch(function (error) {
            console.log(error)
        })
    },
    APIJourney(body){
        return new Promise(function (resolve, reject) {
            axios.get('https://timetable.search.ch/api/route.en.json?from='+body.from+'&to='+body.to+'&num=1&pre=-1&date='+body.date+'&time='+body.time).then(function (response) {
                console.log(response.data);
                resolve(response.data.connections)
            })
        }).catch(function (error) {
            console.log(error)
        })
    }
}

