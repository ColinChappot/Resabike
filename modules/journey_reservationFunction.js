var models = require('../models');

module.exports = {
    insertJourney_Reservation(journey, reservation){
        return new Promise(function (resolve, reject) {
            models.Journey_Reservation.create({
                idJourney: journey.id_journey,
                idReservation: reservation.id_reservation
            }).then(function (journey_reservation) {
                resolve(journey_reservation.dataValues)
            })
        })
    },
    deleteJourney_Reservation(idreservation){
        return new Promise(function (resolve, reject) {
            models.Journey_Reservation.destroy({
                where:{idReservation: idreservation}
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    GetAllStation(body) {
        return new Promise(function (resolve, reject) {
            models.Journey_Reservation.findAll({
                where: {idJourney: body.id_journey}
            }).then(function (journey) {
                resolve(journey)
            })
        })
    },
    CheckNbBike(body) {
        return new Promise(function (resolve, reject) {
            models.Journey_Reservation.findAll({
                where: {idJourney: body.id_journey},
                include: [{
                    model: models.Reservation,
                    as: 'reservation_tab'
                }]
            }).then(function (journey_resservation) {
                var bikenum =0;

                journey_resservation.forEach(function (reservation) {
                    bikenum += reservation.dataValues.reservation_tab.dataValues.bikeNumber
                })
                resolve(bikenum)
            })
        })
    }
}


