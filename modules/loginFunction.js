
var models = require('../models');
//Request to table Login
module.exports = {
    // insert in the table Login
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
    // insert in the table Login without any zone (only for the super admin and users)
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

    //Find the value in the table Login or create it
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
    // delete in the table Login
    deleteLogin(idzone){
        return new Promise(function (resolve, reject) {
            models.Login.destroy({
                where:{idZone: idzone  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    // update in the table Login
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
    // Get all Login by an idzone and an idrole in the table Login
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

    //Check if the Login is correct
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


