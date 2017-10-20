var models = require('../models');

module.exports = {
    insertPersonContact(body){
        return new Promise(function (resolve, reject) {
            models.PersonContact.create({
                lastname: body.lastname,
                firstname: body.firstname,
                email: body.email,
                telephone: body.telephone
            }).then(function (personcontact) {
                resolve(personcontact)
            })
        })
    },
    insertZone(body, personContact){
        return new Promise(function (resolve, reject) {
            models.Zone.create({
                name: body.name,
                id_personContact: personContact.id
            }).then(function (zone) {
                resolve(zone)
            })
        })
    },
    insertLogin(body, zone){
        return new Promise(function (resolve, reject) {
            models.Login.create({
                username: body.userName,
                password: body.password,
                id_zone: zone.id,
                id_role: body.id
            }).then(function (zone) {
                resolve(zone)
            })
        })
    },
    insertReservation(body){
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
                confirmation: body,
                id_date: body.id_date,
                id_login: body.id_login
            }).then(function (resrvation) {
                resolve(resrvation)
            })
        })
    }
}