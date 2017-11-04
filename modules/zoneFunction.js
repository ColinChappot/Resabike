var models = require('../models');

module.exports = {
    insertZone(body){
        return new Promise(function (resolve, reject) {
            models.Zone.create({
                name: body.name
            }).then(function (zone) {
                resolve(zone.dataValues)
            })
        })
    },
    deleteZone(idzone){
        return new Promise(function (resolve, reject) {
            models.Zone.destroy({
                where:{id_zone: idzone  }
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
                resolve(zone.dataValues)
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
                resolve(zone.dataValues)
            })
        })
    },
    GetZoneWithAllChild(idzone)
    {
        return new Promise(function (resolve, reject) {
            models.Zone.findOne(
                {
                    where: {id_zone: idzone},
                    include: [{
                        model: models.Ligne,
                        as: 'ligne',
                        include: [{
                            model: models.Journey,
                            as: 'journey',
                            include: [{
                                model: models.Journey_Reservation,
                                as: 'journey_tab',
                                include: [{
                                    model: models.Reservation,
                                    as: 'reservation_tab',
                                    where: {confirmed: true},
                                    include: [{
                                        model: models.Date,
                                        as: 'date',
                                    }]
                                }]

                            }]
                        }]
                    }]
                }
            ).then(function (zone) {
                resolve(zone.dataValues)
            })
        })
    }
}