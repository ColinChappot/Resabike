var models = require('../models');

//Request to table Journey
module.exports = {

    // insert in the table Journey
    insertJourney(body, line) {
        return new Promise(function (resolve, reject) {
            models.Journey.findOrCreate(
                {
                    where: {    journeyNumber: body.number},
                    defaults: { journeyNumber: body.number,
                                idLine: line.id_line}
            }).then(function (journey) {
                resolve(journey[0].dataValues)
            })
        })
    },
    // delete in the table Journey
    deleteJourney(idLine){
        return new Promise(function (resolve, reject) {
            models.Journey.destroy({
                where:{idLine: idLine  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    // Get all journey by an id_line in the table Journey
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