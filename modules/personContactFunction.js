var models = require('../models');

//Request to table Journey_Reservation
module.exports = {
    // insert in the table PersonContact
    insertPersonContact(id_zone){
        return new Promise(function (resolve, reject) {
            models.PersonContact.create({
                idZone: id_zone
            }).then(function (personcontact) {
                resolve(personcontact.dataValues)
            })
        })
    },
    // delete in the table Login
    deletePersonContact(idzone){
        return new Promise(function (resolve, reject) {
            models.PersonContact.destroy({
                where:{idZone: idzone  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    // update in the table Login
    updatePersonContact(body, idzone){
        return new Promise(function (resolve, reject) {
            models.PersonContact.update(
                {   lastname: body.lastname,
                    firstname: body.firstname,
                    mail: body.mail,
                    telephone: body.telephone},
                {   where:{idZone: idzone  }
                }).then(function (PersonContact) {
                resolve(PersonContact.dataValues)
            })
        })
    },
    // Get all Login by an idzone in the table Login
    GetOnePersonContact(idzone) {
        return new Promise(function (resolve, reject) {
            models.PersonContact.findOne({
                where: {idZone: idzone}
            }).then(function (personcontact) {
                resolve(personcontact.dataValues)
            })
        })
    }
}