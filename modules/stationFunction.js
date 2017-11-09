var models = require('../models');

module.exports = {
    insertStation(body){
        return new Promise(function (resolve, reject) {
            models.Station.findOrCreate({
                where: {name: body.name},
                defaults: {name: body.name,stopId: body.stopid}
            }).then(function (station) {
                resolve(station[0].dataValues)
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
                {   where: {id_station: idStation}}
            ).then(function (station) {
                resolve(station)
            })
        })
    },
    GetOneStationLike(text)
    {
        return new Promise(function (resolve, reject) {
            models.Station.findAll(
                {   where:{name:{$like: text+'%'}}}
            ).then(function (station) {
                resolve(station)
            })
        })
    },
    GetONeStationByName(name) {
        return new Promise(function (resolve, reject) {
            models.Station.findOne(
                {   where: {name: name},
                include: [{
                    model: models.Line_Station,
                    as: "station_tab",
                    include:[{
                        model: models.Line,
                        as: "line_tab"
                    }]
            }]}
            ).then(function (station) {
                resolve(station.dataValues)
            })
        })
    }
}