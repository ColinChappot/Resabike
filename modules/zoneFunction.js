var models = require('../models');

//Request to table Zone
module.exports = {
    // insert in the table Zone
    insertZone(body){
        return new Promise(function (resolve, reject) {
            models.Zone.create({
                name: body.name
            }).then(function (zone) {
                resolve(zone.dataValues)
            })
        })
    },
    // delete in the table Zone
    deleteZone(idzone){
        return new Promise(function (resolve, reject) {
            models.Zone.destroy({
                where:{id_zone: idzone  }
            }).then(function (nbrRow) {
                resolve(nbrRow)
            })
        })
    },
    // Get all Zone in the table Zone
    GetAllZone() {
        return new Promise(function (resolve, reject) {
            models.Zone.findAll(
            ).then(function (zone) {
                resolve(zone)
            })
        })
    },
    // Get one Zone by an idzone in the table Zone
    GetOneZone(idzone) {
        return new Promise(function (resolve, reject) {
            models.Zone.findOne({
                where: {id_zone: idzone}
            }).then(function (zone) {
                resolve(zone.dataValues)
            })
        })
    },
    // Get one Zone and all the table to the reservation by an idzone in the table Zone
    GetZoneWithAllChild(idzone)
    {
        return new Promise(function (resolve, reject) {
            models.Zone.findOne(
                {
                    where: {id_zone: idzone},
                    include: [{
                        model: models.Line,
                        as: 'line',
                        include: [{
                            model: models.Journey,
                            as: 'journey',
                            include: [{
                                model: models.Journey_Reservation,
                                as: 'journey_tab',
                                include: [{
                                    model: models.Reservation,
                                    as: 'reservation_tab',
                                    where: {idState: [2,1]},
                                    include:[{
                                        model: models.Date,
                                        as: 'date'
                                    },
                                        {model: models.Time,
                                         as: 'time'},
                                        {model: models.State,
                                         as: 'state'}
                                    ]
                                }]
                            }]
                        }]
                    }]
        }).then(function (zone) {
            //Create an Array of date to display it by date
                zoneDate = new Object();
                dateTab = new Array();
                day = new Date().getDate();
                month = new Date().getMonth();
                year = new Date().getFullYear();

                var test = false;
                var i =0;

                zone.line.forEach(function (line) {
                    line.journey.forEach(function (journey) {
                        journey.journey_tab.forEach(function (journey_reservation) {
                            var date = journey_reservation.reservation_tab.date.day+"."+journey_reservation.reservation_tab.date.month+"."+journey_reservation.reservation_tab.date.year;
                            dateTab.forEach(function (tab) {

                                if(date === tab)
                                {
                                    test = true;
                                }
                                i++;
                            })
                            if(test === false)
                            {
                                if(year <= date.substring(6,10))
                                {
                                    if(month <= date.substring(3,5))
                                    {
                                        if(day < date.substring(0,2))
                                        {
                                            dateTab.push(date);
                                        }
                                    }
                                }
                            }
                            i=0;
                            test = false;
                        })
                    })
                })
                dateTab.sort();
                zone.dateTab = dateTab;
                resolve(zone)
            })
        })
    },

    // Get one Zone and all the table to the reservation where the reservation are confirmed by an idzone in the table Zone
    GetZoneWithAllChildConfirm(idzone)
    {
        return new Promise(function (resolve, reject) {
            models.Zone.findOne(
                {
                    where: {id_zone: idzone},
                    include: [{
                        model: models.Line,
                        as: 'line',
                        include: [{
                            model: models.Journey,
                            as: 'journey',
                            include: [{
                                model: models.Journey_Reservation,
                                as: 'journey_tab',
                                include: [{
                                    model: models.Reservation,
                                    as: 'reservation_tab',
                                    where: {idState: 1},
                                    include:[{
                                        model: models.Date,
                                        as: 'date'
                                    },
                                        {model: models.Time,
                                            as: 'time'},
                                        {model: models.State,
                                            as: 'state'}
                                    ]
                                }]
                            }]
                        }]
                    }]
                }).then(function (zone) {
                //Create an Array of date to display it by date

                 zoneDate = new Object();
                 dateTab = new Array();
                 day = new Date().getDate();
                 month = new Date().getMonth();
                 year = new Date().getFullYear();

                 var test = false;
                var i =0;

                    zone.line.forEach(function (line) {
                        line.journey.forEach(function (journey) {
                            journey.journey_tab.forEach(function (journey_reservation) {
                               var date = journey_reservation.reservation_tab.date.day+"."+journey_reservation.reservation_tab.date.month+"."+journey_reservation.reservation_tab.date.year;
                               dateTab.forEach(function (tab) {

                                   if(date === tab)
                                   {
                                       test = true;
                                   }
                                   i++;
                               })
                               if(test === false)
                               {
                                   if(year <= date.substring(6,10))
                                   {
                                       if(month <= date.substring(3,5))
                                       {
                                           if(day < date.substring(0,2))
                                           {
                                               dateTab.push(date);
                                           }
                                       }
                                   }
                               }
                                i=0;
                               test = false;
                            })
                        })
                    })
                dateTab.sort();
                zone.dateTab = dateTab;
                resolve(zone)
            })
        })
    }
}