var models = require('../models');

module.exports = {
    insertReservation(body,state, date,time,id_login){
        return new Promise(function (resolve, reject) {
            models.Reservation.create({
                lastname: body.lastname,
                firstname: body.firstname,
                telephone: body.telephone,
                mail: body.mail,
                bikeNumber: body.bikeNumber,
                groupName: body.groupName,
                from: body.from,
                to: body.to,
                remarks: body.remarks,
                state: state,
                idDate: date.id_date,
                idTime: time.id_time,
                idLogin: id_login,
                idState: state
            }).then(function (reservation) {
                resolve(reservation.dataValues)
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
    updateReservation(id_reservation, state){
        return new Promise(function (resolve, reject) {
            models.Reservation.update(
                {   state: state},
                {   where: {id_reservation: id_reservation}
                }).then(function (reservation) {
                resolve(reservation.dataValues)
            })
        })
    },
    GetOneReservation(id_reservation, state){
        return new Promise(function (resolve, reject) {
            models.Reservation.findOne(
                {   where: {id_reservation: id_reservation},
                    include: [{
                        model: models.Date,
                        as: 'date'
                    },
                        {model: models.Time,
                            as: 'time'}]
                }).then(function (reservation) {
                resolve(reservation.dataValues)
            })
        })
    },
    GetAllReservationUser(id_login) {
        return new Promise(function (resolve, reject) {
            models.Reservation.findAll({
                where: {idLogin: id_login},
                include: [{
                    model: models.Date,
                    as: 'date'
                },
                    {model: models.Time,
                        as: 'time'},
                    {model: models.State,
                        as:'state'
                    }]
            }).then(function (reservation) {
                resolve(reservation)
            })
        })
    },
    GetAllReservationByJourney(idReservation) {
        return new Promise(function (resolve, reject) {
            models.Reservation.findAll({
                where: {id_reservation: idReservation},
                include: [{
                    model: models.Date,
                    as: 'date'
                },
                    {model: models.Time,
                     as: 'time'},
                    {model: models.State,
                        as:'state'
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
                    as: 'date'
                },
                    {model: models.Time,
                        as: 'time'},
                    {model: models.State,
                        as:'state'
                    }]
          //      order: [ [ { model: models.Data, as: 'date' }, 'day', 'DESC' ] ]
            }).then(function (reservation) {
                resolve(reservation)
            })
        })
    }
}