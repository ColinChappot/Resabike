var models = require('../models');

module.exports = {
    insertLine_Station(line, station){
        return new Promise(function (resolve, reject) {
            models.Line_Station.create({
                idLine: line.id_line,
                idStation: station.id_station
            }).then(function (line_station) {
                if(line_station == null)
                {
                    resolve(null)
                }
                resolve(line_station.dataValues)
            })
        })
    },
    deleteLine_Station(idline){
        return new Promise(function (resolve, reject) {
            models.Line_Station.destroy({
                where:{idLine: idline}
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    GetAllLineStation(body) {
        return new Promise(function (resolve, reject) {
            models.Line_Station.findAll({
                where: {idLine: body.id_line}
            }).then(function (line) {
                resolve(line)
            })
        })
    },
    GetOneLineStation(idline) {
        return new Promise(function (resolve, reject) {
            models.Line_Station.findAll({
                where: {idLine: idline},
                include: [{
                    model: models.Line,
                    as: 'line_tab',
                },{
                    model: models.Station,
                    as: 'station_tab'
                }]
            }).then(function (line) {
                resolve(line)
            })
        })
    }

}