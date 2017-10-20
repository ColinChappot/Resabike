var models = require('../models');

module.exports = {
    insertJourney_Reservation(journey, reservation){
        return new Promise(function (resolve, reject) {
            models.journey_reservation.create({
                id_journey: journey.id,
                id_reservation: reservation.id
            }).then(function (journey_reservation) {
                resolve(journey_reservation)
            })
        })
    },
    deleteJourney_Reservation(body){
        return new Promise(function (resolve, reject) {
            models.journey_reservation.destroy({
                where:{id_journey: body.id_journey, id_reservation: body.id_reservation}
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    }
}


