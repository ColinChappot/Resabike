var models = require('../models');

module.exports = {
    insertLine_Station(line, station){
        return new Promise(function (resolve, reject) {
            models.line_station.create({
                idLine: line.id_line,
                idStation: station.id_station
            }).then(function (line_station) {
                resolve(line_station.dataValues)
            })
        })
    },
    deleteLine_Station(idline){
        return new Promise(function (resolve, reject) {
            models.line_station.destroy({
                where:{idLine: idline}
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    GetAllStation(body) {
        return new Promise(function (resolve, reject) {
            models.Line_Station.findAll({
                where: {idLine: body.id_line}
            }).then(function (line) {
                resolve(line)
            })
        })
    }

}