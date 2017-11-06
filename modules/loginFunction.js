
var models = require('../models');

module.exports = {
    insertLoginRole(username,password, zone, role){
        return new Promise(function (resolve, reject) {
            models.Login.create({
                username: username,
                password: password,
                idZone: zone.id_zone,
                idRole: role
            }).then(function (login) {
                resolve(login.dataValues)
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
                resolve(login.dataValues)
            })
        })
    },
    FindOrCreate(username, password, role){
        return new Promise(function (resolve, reject) {
            models.Login.findOrCreate({
                where: {username: username, password: password},
                defaults: {username: username, password: password, idRole: role}
            }).then(function (station) {
                resolve(station[0].dataValues)
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
                {   username: body.username,
                    password: body.password},
                {   where: {idZone: zone, idRole: role}
                }).then(function (login) {
                resolve(login.dataValues)
            })
        })
    },
    GetOneLogin(idzone, idrole) {
        return new Promise(function (resolve, reject) {
            models.Login.findOne({
                where: {idZone: idzone,
                        idRole: idrole}
            }).then(function (login) {
                resolve(login.dataValues)
            })
        })
    },
    CheckLogin(body) {
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


