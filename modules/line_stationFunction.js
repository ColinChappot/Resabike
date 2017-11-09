var models = require('../models');

module.exports = {
    insertLine_Station(line, station){
        return new Promise(function (resolve, reject) {
            models.Line_Station.create({
                idLine: line.id_line,
                idStation: station.id_station
            }).then(function (line_station) {
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
    GetAllLineStation(id_line) {
        return new Promise(function (resolve, reject) {
            models.Line_Station.findAll({
                where: {idLine: id_line}
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
    },
    CheckZoneStation(from, to){
        return new Promise(function (resolve, reject) {

            var ok = false;

            from.station_tab.forEach(function (stationFrom) {
                to.station_tab.forEach(function (stationTo) {
                    if(stationFrom.line_tab.dataValues.idZone == stationTo.line_tab.dataValues.idZone)
                    {
                        ok = true;
                    }
                })
            })
            resolve(ok);
        })
    }

}