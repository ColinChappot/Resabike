var models = require('../models');

module.exports = {
    insertReservation(body, date){
        return new Promise(function (resolve, reject) {
            models.Reseravation.create({
                lastname: body.lastname,
                firstname: body.firstname,
                telephone: body.telephone,
                mail: body.mail,
                bikeNumber: body.bikeNumber,
                groupName: body.groupName,
                from: body.from,
                to: body.to,
                remarks: body.remarks,
                confirmation: body.confirmation,
                idDate: date.id_date,
                idLogin: body.id_login
            }).then(function (reservation) {
                resolve(reservation)
            })
        })
    },

    deleteReservation(id_reservation){
        return new Promise(function (resolve, reject) {
            models.Reservation.destroy({
                where:{id_reservation: id_reservation  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    updateReservation(id_reservation){
        return new Promise(function (resolve, reject) {
            models.Reseravation.update(
                {   confirmation: true},
                {   where: {id_reservation: body.id_reservation}
                }).then(function (reservation) {
                resolve(reservation)
            })
        })
    },
    GetAllReservation(body) {
        return new Promise(function (resolve, reject) {
            models.Reservation.findAll({
                where: {idDate: body.id_date,
                        idLogin: body.id_login}
            }).then(function (reservation) {
                resolve(reservation)
            })
        })
    },
    GetAllReservationByJourney(body) {
        return new Promise(function (resolve, reject) {
            models.Reservation.findAll({
                where: {id_reservation: body.idReservation},
                include: [{
                    model: models.Date,
                    as: 'date',
                    where: { id_date: {$col: 'Reservation.idDate' } }
                }]
            }).then(function (reservation) {
                resolve(reservation)
            })
        })
    },
    GetAllReservationByJourneyConfirmed(body) {
        return new Promise(function (resolve, reject) {
            models.Reservation.findAll({
                where: {id_reservation: body.idReservation, confirmation: true},
                include: [{
                    model: models.Date,
                    as: 'date',
                    where: { id_date: {$col: 'Reservation.idDate' } }
                }]
          //      order: [ [ { model: models.Data, as: 'date' }, 'day', 'DESC' ] ]
            }).then(function (reservation) {
                resolve(reservation)
            })
        })
    }
}