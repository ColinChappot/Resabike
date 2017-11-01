var models = require('../models');

module.exports = {

    insertJourney(body, line) {
        return new Promise(function (resolve, reject) {
            models.Journey.findOrCreate(
                {
                    where: {    journeyNumber: body.journeyNumber},
                    defaults: { journeyNumber: body.journeyNumber,
                                idLine: body.id_line}
            }).then(function (journey) {
                if(journey == null)
                {
                    resolve(null)
                }
                resolve(journey.dataValues)
            })
        })
    },
    deleteJourney(body){
        return new Promise(function (resolve, reject) {
            models.Journey.destroy({
                where:{id_journey: body.id_journey  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    updateJourney(body, line){
        return new Promise(function (resolve, reject) {
            models.Journey.update(
                {   journeyNumber: body.journeyNumber,
                    idLine: body.id_line},
                {   where: {id_journey: body.id_journey}
                }).then(function (journey) {
                if(journey == null)
                {
                    resolve(null)
                }
                resolve(journey.dataValues)
            })
        })
    },
    GetAllJourney(id_line) {
        return new Promise(function (resolve, reject) {
            models.Journey.findAll({
                where: {idLine: id_line}
            }).then(function (journey) {
                resolve(journey)
            })
        })
    }
}