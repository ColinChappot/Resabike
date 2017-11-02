var express = require('express');
var router = express.Router();
var lineFunction = require('../modules/lineFunction');
var stationFunction = require('../modules/stationFunction');
var station_lineFunction = require('../modules/line_stationFunction');
var personContactFunction = require('../modules/personContactFunction');
var loginFunction = require('../modules/loginFunction');
var journeyFunction = require('../modules/journeyFunction');
var journey_reservationFunction = require('../modules/journey_reservationFunction');
var reservationFunction = require('../modules/reservationFunction');
var zoneFunction = require('../modules/zoneFunction');



//permet d'accèder à une zone spécifique
router.get('/', function(req, res, next) {
    // if(req.session.idrole != 2)
    // {
    //     return;
    // }
    var idzone = req.session.idzone;
    zone.GetOneZone(idzone).then(function (zone) {
        lineFunction.GetAllLine(zone.id_zone).then(function (lines) {
            res.render('admin', {zone: zone, lines: lines});
        })
    })
});

//permet de créer une ligne dans la zone
router.post('/', (req, res, next) => {
    if(req.session.idrole != 2)
    {
        return;
    }
    var idzone = req.session.idzone;
    lineFunction.CreateLine(req.body).then(function (data) {
        if (data.connections[0].legs.size() <= 2)
        {
            lineFunction.insertLine(data.connections[0], idzone).then(function (line) {
                stationFunction.insertStation(data.connections[0].legs[0]).then(function (station) {
                    station_lineFunction.insertLine_Station(line, station).then(function () {
                        data.connections[0].legs[1].stops.each(function (stops) {
                            stationFunction.insertStation(stops).then(function (station) {
                                station_lineFunction.insertLine_Station(line, station).then(function () {
                                })
                            })
                        })
                    })
                })
            }).then(function () {
                res.render('line', {line: line, idzone: idzone});
            })
        }
        else
        {
            res.redirect('zone/'+idzone);
        }
    })
});

//permet d'accèder à une ligne
router.get('/line', function(req, res, next) {
    if(req.session.idrole != 2)
    {
        return;
    }
    var idzone = req.session.idzone;
    lineFunction.GetOneLine(idline).then(function (line) {
        station_lineFunction.GetAllStation(line).then(function (idStation) {
            stationFunction.GetAllStationFromLine(line, idStation).then(function (stations) {
                res.render('line', {stations: stations, idline: idline, idzone: idzone});
            })
        })
    })
});

//permet d'accèder à une zone spécifique
router.get('/contact', function(req, res, next) {
    if(req.session.idrole != 2)
    {
        return;
    }
    var idzone = req.session.idzone;
    zone.GetOnePersonContact(idzone).then(function (contact) {
            res.render('contact', {zone: idzone, contact: contact});
    })
});

//permet de modifier la personne de contact
router.post('/contact', (req, res, next) => {
    if(req.session.idrole != 2)
    {
        return;
    }
    var idzone = req.session.idzone;
    personContactFunction.updatePersonContact(req.body,idzone).then(function () {
        res.render('contact', {zone: idzone});
    })
});

//permet d'accèder au conducteur
router.get('/driver', function(req, res, next) {
    if(req.session.idrole != 2)
    {
        return;
    }
    var idzone = req.session.idzone;
    zone.GetOneLogin(idzone, 1).then(function (contact) {
        res.render('driver', {zone: idzone, contact: contact});
    })
});

//permet de modifier le driver
router.post('/driver', (req, res, next) => {
    if(req.session.idrole != 2)
    {
        return;
    }
    var idzone = req.session.idzone;
            loginFunction.updateLogin(req.body, idzone, 1).then(function () {
                res.render('driver', {zone: idzone});
            })
});

//permet de delete une ligne
router.delete('/zone/line/:idline', function(req, res, next) {
    if(req.session.idrole != 2)
    {
        return;
    }
    let idline = req.params.idline;
    station_lineFunction.deleteLine_Station(idline).then(function () {
        lineFunction.deleteLine(line).then(function () {
            res.redirect('/zone/' + line.idZone);
        })
    })
});

//permet d'accèder aux réservations
router.get('/reservation', function(req, res, next) {
    if(req.session.idrole != 2)
    {
        return;
    }
    var idzone = req.session.idzone;
  /*  var data = {};
    var dataline ;
    var dataJourney;

    lineFunction.GetAllLine(idzone).then(function (lines) {
        lines.each(function (line) {
            journeyFunction.GetAllJourney(lines.id_line).then(function (journeys) {
                journeys.journey.each(function (journey) {
                    journey_reservationFunction.GetAllStation(journey).then(function (journey_reservations) {
                        journey_reservations.journey_reservation.each(function (journey_reservation) {
                            reservationFunction.GetAllReservationByJourney(journey_reservation).then(function (reservations) {
                                dataJourney.reservations.add(reservations);
                            })
                        })
                        dataJourney.journey = journey;
                    })
                    dataline.add(dataJourney)
                })
                dataline.line = line;
            })
            data.add(dataline)
        })*/
  zoneFunction.GetZoneWithAllChild(idzone).then(function (data) {
        res.render('reservation', {data: data});
    })
});

//permet de delete une réservation
router.delete('/reservation/:idreservation', function(req, res, next) {
    if(req.session.idrole != 2)
    {
        return;
    }
    let idreservation = req.params.idreservation;
    reservationFunction.deleteReservation(idreservation).then(function () {
        journey_reservationFunction.deleteJourney_Reservation(idreservation).then(function () {
            res.redirect('/reservation');
        })
    })
});

//permet de confirmer les réservation
router.post('/reservation/:idreservation', (req, res, next) => {
    if(req.session.idrole != 2)
    {
        return;
    }
    let idreservation = req.params.idreservation;
    reservationFunction.updateReservation(idreservation).then(function (reservation) {

        //envoi du mail de confirmation

        res.redirect('/reservation');
    })


});

module.exports = router;