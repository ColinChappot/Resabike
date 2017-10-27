
var models = require('../models');

module.exports = {
    insertLogin(body, zone, role){
        return new Promise(function (resolve, reject) {
            models.Login.create({
                username: body.username,
                password: body.password,
                idZone: zone.id_zone,
                idRole: role
            }).then(function (login) {
                resolve(login)
            })
        })
    },

    deleteLogin(idzone){
        return new Promise(function (resolve, reject) {
            models.Login.destroy({
                where:{idZone: idzone  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },

    updateLogin(body, zone, role){
        return new Promise(function (resolve, reject) {
            models.Login.update(
                {   username: body.userName,
                    password: body.password,
                    idZone: zone.id,
                    idRole: role},
                {   where: {idZone: zone, idRole: role}
                }).then(function (zone) {
                resolve(zone)
            })
        })
    },
    GetOneLogin(idzone, idrole) {
        return new Promise(function (resolve, reject) {
            models.Login.findOne({
                where: {idZone: idzone,
                        idRole: idrole}
            }).then(function (login) {
                resolve(login)
            })
        })
    },
    CheckLogin(idzone, idrole) {
        return new Promise(function (resolve, reject) {
            models.Login.findOne({
                where: {username: body.username,
                    password: body.password}
            }).then(function (login) {
                resolve(login)
            })
        })
    }

}


