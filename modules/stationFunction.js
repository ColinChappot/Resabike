var models = require('../models');

module.exports = {
    insertStation(body){
        return new Promise(function (resolve, reject) {
            models.Station.findOrCreate({
                where: {name: body.name},
                defaults: {name: body.name,stopId: body.stopid}
            }).then(function (station) {
                if(station == null)
                {
                    resolve(null)
                }
                resolve(station.dataValues)
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
                if(station == null)
                {
                    resolve(null)
                }
                resolve(station.dataValues)
            })
        })
    },
    GetAllStation() {
        return new Promise(function (resolve, reject) {
            models.Station.findAll(
            ).then(function (station) {
                resolve(station)
            })
        })
    },
    GetAllStationFromLine(idStation) {
        return new Promise(function (resolve, reject) {
            models.Station.findAll(
                {   where: {id_station: idStation.id_station}}
            ).then(function (station) {
                resolve(station)
            })
        })
    }
}