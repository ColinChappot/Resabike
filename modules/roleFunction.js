var models = require('../models');

module.exports = {
    insertRole(name){
        return new Promise(function (resolve, reject) {
            models.Role.create({
                name: name
            }).then(function (role) {
                resolve(role.dataValues)
            })
        })
    },
    deleteRole(body){
        return new Promise(function (resolve, reject) {
            models.Role.destroy({
                where:{id_role: body.id_role  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    updateRole(body){
        return new Promise(function (resolve, reject) {
            models.Role.update(
                {   name: body.name},
                {   where: {id_role: body.id_role}
                }).then(function (role) {
                resolve(role.dataValues)
            })
        })
    }, findOrCreateRole(name){
        return new Promise(function (resolve, reject) {
            models.Role.findOrCreate({
                where: {name: name},
                defaults: {name: name}
            }).then(function (station) {
                resolve(station[0].dataValues)
            })
        })
    }
}