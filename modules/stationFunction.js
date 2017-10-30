var models = require('../models');

module.exports = {
    insertStation(body){
        return new Promise(function (resolve, reject) {
            models.Station.findOrCreate({
                where: {name: body.name},
                defaults: {name: body.name,stopId: body.stopid}
            }).then(function (station) {
                resolve(station)
            })
        })
    },
    deleteStation(body){
        return new Promise(function (resolve, reject) {
            models.Station.destroy({
                where:{id_station: body.id_station  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    updateStation(body){
        return new Promise(function (resolve, reject) {
            models.Station.update(
                {   name: body.name},
                {   where: {id_station: body.id_station}
                }).then(function (station) {
                resolve(station)
            })
        })
    },
    GetAllStation(body) {
        return new Promise(function (resolve, reject) {
            models.Station.findAll(
            ).then(function (station) {
                resolve(station)
            })
        })
    },
    GetAllStationFromLine(line, idStation) {
        return new Promise(function (resolve, reject) {
            models.Station.findAll(
                {   where: {idLine: line.id_line, idStation: idStation.id_station}}
            ).then(function (station) {
                resolve(station)
            })
        })
    }
}