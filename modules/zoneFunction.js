var models = require('../models');

module.exports = {
    insertZone(body){
        return new Promise(function (resolve, reject) {
            models.Zone.create({
                name: body.name
            }).then(function (zone) {
                if(zone == null)
                {
                    resolve(null)
                }
                resolve(zone.dataValues)
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
                if(zone == null)
                {
                    resolve(null)
                }
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
                if(zone == null)
                {
                    resolve(null);
                    return;
                }
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
                        where: { id_zone: idzone },
                        include: [{
                            model: models.Journey,
                            as: 'journey',
                            where: {idLine: {$col:'ligne.id_ligne'}},
                            include: [{
                                model: models.Journey_Reservation,
                                as: 'journey_tab',
                                where: {idJourney: {$col:'journey.id_journey'}},
                                include: [{
                                    model: models.Reservation,
                                    as: 'reservation_tab',
                                    where: {id_reservation: {$col:'journey_tab.idReservation'}, confirmed: true},
                                    include: [{
                                        model: models.Date,
                                        as: 'date',
                                        where: {id_date: {$col:'Reservation.idDate'}}
                                    }]
                                }]

                            }]
                        }]
                    }]
                }
            ).then(function (zone) {
                if(zone == null)
                {
                    resolve(null)
                }
                resolve(zone.dataValues)
            })
        })
    }
}