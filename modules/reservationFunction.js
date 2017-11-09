var models = require('../models');

//Request to table Reservation
module.exports = {
    // insert in the table Reservation
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
    // delete in the table Reservation
    deleteReservation(id_reservation){
        return new Promise(function (resolve, reject) {
            models.Reservation.destroy({
                where:{id_reservation: id_reservation  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    // update in the table Reservation
    updateReservation(id_reservation, state){
        return new Promise(function (resolve, reject) {
            models.Reservation.update(
                {   idState: state},
                {   where: {id_reservation: id_reservation}
                }).then(function (reservation) {
                resolve(reservation.dataValues)
            })
        })
    },

    // Get One Reservation by an id_reservation in the table Reservation
    GetOneReservation(id_reservation){
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
    // Get one Reservation by an id_login in the table Reservation
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
    }
}