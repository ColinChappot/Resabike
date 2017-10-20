var models = require('../models');

module.exports = {
    insertLine(body){
        return new Promise(function (resolve, reject) {
            models.Line.create({
                name: body.name,
                fromStation: body.fromStation,
                toStation: body.toStation,
                idZone: body.id_zone
            }).then(function (date) {
                resolve(date)
            })
        })
    },

    deleteDate(body){
        return new Promise(function (resolve, reject) {
            models.Date.destroy({
                where:{id_line: body.id_line  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    updateLine(body){
        return new Promise(function (resolve, reject) {
            models.Date.update(
                {   name: body.name,
                    fromStation: body.fromStation,
                    toStation: body.toStation,
                    idZone: body.id_zone},
                {   where: {id_line: body.id_line}
                }).then(function (date) {
                resolve(date)
            })
        })
    },
    GetAllLine(body) {
        return new Promise(function (resolve, reject) {
            models.Line.findAll({
                where: {id_zone: body.id_zone}
            }).then(function (line) {
                resolve(line)
            })
        })
    },
    GetOneLine(body) {
        return new Promise(function (resolve, reject) {
            models.Line.findOne({
                where: {id_line: body.id_line}
            }).then(function (line) {
                resolve(line)
            })
        })
    }
}

