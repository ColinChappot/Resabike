var models = require('../models');
//Request to table Role
module.exports = {
    // insert in the table Role
    insertRole(name){
        return new Promise(function (resolve, reject) {
            models.Role.create({
                name: name
            }).then(function (role) {
                resolve(role.dataValues)
            })
        })
    },
    // delete in the table Role
    deleteRole(body){
        return new Promise(function (resolve, reject) {
            models.Role.destroy({
                where:{id_role: body.id_role  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    // update in the table Role
    updateRole(body){
        return new Promise(function (resolve, reject) {
            models.Role.update(
                {   name: body.name},
                {   where: {id_role: body.id_role}
                }).then(function (role) {
                resolve(role.dataValues)
            })
        })
    },
    //Find the value in the table Role or create it
    findOrCreateRole(name){
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