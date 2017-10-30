var models = require('../models');

module.exports = {
    insertZone(body){
        return new Promise(function (resolve, reject) {
            models.Zone.create({
                name: body.name
            }).then(function (zone) {
                resolve(zone)
            })
        })
    },
    deleteZone(body){
        return new Promise(function (resolve, reject) {
            models.Zone.destroy({
                where:{id_zone: body.id_zone  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    updateZone(body){
        return new Promise(function (resolve, reject) {
            models.Zone.update(
                {   name: body.name},
                {   where: {id_zone: body.id_zone}
                }).then(function (zone) {
                resolve(zone)
            })
        })
    },
    GetAllZone() {
        return new Promise(function (resolve, reject) {
            models.Zone.findAll(
            ).then(function (zone) {
                resolve(zone)
            })
        })
    },
    GetOneZone(idzone) {
        return new Promise(function (resolve, reject) {
            models.Zone.findOne({
                where: {id_zone: idzone}
            }).then(function (zone) {
                resolve(zone)
            })
        })
    },
    GetZoneWithAllChild()
    {
        return new Promise(function (resolve, reject) {
            models.Zone.findAll(
                {

                }
            ).then(function (zone) {
                resolve(zone)
            })
        })
    }
}