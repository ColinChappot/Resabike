var models = require('../models');


module.exports = {
    insertPersonContact(id_zone){
        return new Promise(function (resolve, reject) {
            models.PersonContact.create({
                idZone: id_zone
            }).then(function (personcontact) {
                if(personcontact == null)
                {
                    resolve(null)
                }
                resolve(personcontact.dataValues)
            })
        })
    },

    deletePersonContact(idzone){
        return new Promise(function (resolve, reject) {
            models.PersonContact.destroy({
                where:{idZone: idzone  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    updatePersonContact(body, idzone){
        return new Promise(function (resolve, reject) {
            models.PersonContact.update(
                {   lastname: body.lastname,
                    firstname: body.firstname,
                    mail: body.mail,
                    telephone: body.telephone},
                {   where:{idZone: idzone  }
                }).then(function (PersonContact) {
                if(personcontact == null)
                {
                    resolve(null)
                }
                resolve(PersonContact.dataValues)
            })
        })
    },
    GetOnePersonContact(idzone) {
        return new Promise(function (resolve, reject) {
            models.PersonContact.findOne({
                where: {idZone: idzone}
            }).then(function (personcontact) {
                if(personcontact == null)
                {
                    resolve(null)
                }
                resolve(personcontact.dataValues)
            })
        })
    }
}