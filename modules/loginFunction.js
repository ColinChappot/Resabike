
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

    deleteLogin(body){
        return new Promise(function (resolve, reject) {
            models.Login.destroy({
                where:{id: body.id  }
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
                {   where: {id: body.id}
                }).then(function (zone) {
                resolve(zone)
            })
        })
    },
    GetAllLogin(body) {
        return new Promise(function (resolve, reject) {
            models.Login.findAll({
                where: {id_zone: body.id_zone,
                        id_role: body.id_role}
            }).then(function (login) {
                resolve(login)
            })
        })
    }
}


