var models = require('../models');

//Request to table Line_Station
module.exports = {
    // insert in the table Line_Station
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
    // delete in the table Line_Station
    deleteLine_Station(idline){
        return new Promise(function (resolve, reject) {
            models.Line_Station.destroy({
                where:{idLine: idline}
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },

    //Check if 2 station belong to the same zone and return true or false
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