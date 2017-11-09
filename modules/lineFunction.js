var models = require('../models');
var axios = require('axios')

//Request to table Line
module.exports = {
    // insert in the table Line
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
    // delete in the table Line
    deleteLine(idline){
        return new Promise(function (resolve, reject) {
            models.Line.destroy({
                where:{id_line: idline  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    // Get all Line by an id_zone in the table Line
    GetAllLine(id_zone) {
        return new Promise(function (resolve, reject) {
            models.Line.findAll({
                where: {idZone: id_zone}
            }).then(function (line) {
                resolve(line)
            })
        })
    },
    // Get all Line by an idline in the table Line
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
    },
    // Get one Line by a name in the table Line
    GetOneLineByName(name) {
        return new Promise(function (resolve, reject) {
            models.Line.findOne({
                where: {name: name}
            }).then(function (line) {
                resolve(line.dataValues)
            })
        })
    },

    //Request the API to return the lines we need
    APILine(body) {
        return new Promise(function (resolve, reject) {
            axios.get('https://timetable.search.ch/api/route.en.json?from='+body.fromStation+'&to='+body.toStation+'&num=3').then(function (response) {
                console.log(response.data);
                resolve(response.data)
                })
        }).catch(function (error) {
            console.log(error)
        })
    },
    //Request the API to return the lines the user want to display
    APIJourney(body){
        return new Promise(function (resolve, reject) {
            axios.get('https://timetable.search.ch/api/route.en.json?from='+body.from+'&to='+body.to+'&num=3&date='+body.date+'&time='+body.time).then(function (response) {
                console.log(response.data);
                resolve(response.data.connections)
            })
        }).catch(function (error) {
            console.log(error)
        })
    }
}

