var models = require('../models');


module.exports = {
    insertPersonContact(body, zone){
        return new Promise(function (resolve, reject) {
            models.PersonContact.create({
                lastname: body.lastname,
                firstname: body.firstname,
                mail: body.mail,
                telephone: body.telephone,
                idZone: zone.id_zone
            }).then(function (personcontact) {
                resolve(personcontact)
            })
        })
    },

    deletePersonContact(body){
        return new Promise(function (resolve, reject) {
            models.journey_reservation.destroy({
                where:{id_personContact: body.id_personContact  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    updatePersonContact(body, zone){
        return new Promise(function (resolve, reject) {
            models.PersonContact.update(
                {   lastname: body.lastname,
                    firstname: body.firstname,
                    mail: body.mail,
                    telephone: body.telephone,
                    idZone: zone.id_zone},
                {   where:{id_personContact: body.id_personContact  }
                }).then(function (PersonContact) {
                resolve(PersonContact)
            })
        })
    },
    GetOnePersonContact(body) {
        return new Promise(function (resolve, reject) {
            models.PersonContact.findOne({
                where: {id_personContact: body.id_personContact}
            }).then(function (personcontact) {
                resolve(personcontact)
            })
        })
    }
}