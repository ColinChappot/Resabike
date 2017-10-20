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
                resolve(resrvation)
            })
        })
    },

    deleteReservation(body){
        return new Promise(function (resolve, reject) {
            models.Reservation.destroy({
                where:{id_reservation: body.id_reservation  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    updateReservation(body, date){
        return new Promise(function (resolve, reject) {
            models.Reseravation.update(
                {   lastname: body.lastname,
                    firstname: body.firstname,
                    telephone: body.telephone,
                    mail: body.mail,
                    bikeNumber: body.bikeNumber,
                    groupName: body.groupName,
                    from: body.from,
                    to: body.to,
                    remarks: body.remarks,
                    confirmation: body.confirmation,
                    idDate: date.id,
                    idLogin: body.id_login},
                {   where: {id_reservation: body.id_reservation}
                }).then(function (resrvation) {
                resolve(resrvation)
            })
        })
    },
    GetAllReservation(body) {
        return new Promise(function (resolve, reject) {
            models.Reservation.findAll({
                where: {id_date: body.id_date,
                        id_login: body.id_login}
            }).then(function (reservation) {
                resolve(resrvation)
            })
        })
    }

}