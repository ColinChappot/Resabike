var models = require('../models');

module.exports = {
    insertLine_Station(line, station){
        return new Promise(function (resolve, reject) {
            models.line_station.create({
                idLine: line.id_line,
                idStation: station.id_station
            }).then(function (line_station) {
                resolve(line_station)
            })
        })
    },
    deleteLine_Station(body){
        return new Promise(function (resolve, reject) {
            models.line_station.destroy({
                where:{idLine: body.id_line, idStation: body.id_station  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    }

}