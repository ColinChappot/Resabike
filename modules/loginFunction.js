
var models = require('../models');

module.exports = {
    insertLogin(username,password, zone, role){
        return new Promise(function (resolve, reject) {
            models.Login.create({
                username: username,
                password: password,
                idZone: zone.id_zone,
                idRole: role
            }).then(function (login) {
                resolve(login)
            })
        })
    },
    insertLogin(username,password, role){
        return new Promise(function (resolve, reject) {
            models.Login.create({
                username: username,
                password: password,
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
    CheckLogin(body) {
        return new Promise(function (resolve, reject) {
            models.Login.findOne({
                where: {idZone: body.idZone,
                    idRole: body.idRole}
            }).then(function (login) {
                resolve(login)
            })
        })
    }

}


