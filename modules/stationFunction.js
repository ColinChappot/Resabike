var models = require('../models');
//Request to table Station
module.exports = {
    // insert in the table Station
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
    // delete in the table Station
    deleteStation(body){
        return new Promise(function (resolve, reject) {
            models.Station.destroy({
                where:{id_station: body.id_station  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    // update in the table Station
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
    // Get All Station who contains the text in the table Station
    GetAllStationLike(text)
    {
        return new Promise(function (resolve, reject) {
            models.Station.findAll(
                {   where:{name:{$like: text+'%'}}}
            ).then(function (station) {
                resolve(station)
            })
        })
    },
    // Get all Station by a name in the table Station
    GetOneStationByName(name) {
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