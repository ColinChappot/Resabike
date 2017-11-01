var models = require('../models');

module.exports = {
    insertRole(name){
        return new Promise(function (resolve, reject) {
            models.Role.create({
                name: name
            }).then(function (role) {
                if(role == null)
                {
                    resolve(null)
                }
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
                if(role == null)
                {
                    resolve(null)
                }
                resolve(role.dataValues)
            })
        })
    }
}