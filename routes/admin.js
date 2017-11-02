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
var session = require('express-session');



//permet d'accèder à une zone spécifique
router.get('/', function(req, res, next) {
    if(session.login.idRole != 2)
    {
         res.redirect('/login/redirect')
    }
    var idzone = req.session.idzone;
    zone.GetOneZone(idzone).then(function (zone) {
        lineFunction.GetAllLine(zone.id_zone).then(function (lines) {
            res.render('admin', {zone: zone, lines: lines});
        })
    })
});

//permet de créer une ligne dans la zone
router.post('/sa_line/:idzone', (req, res, next) => {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect')
    }
    let idzone = req.params.idzone;

    lineFunction.CreateLine(req.body).then(function (data) {
        if (data.connections[0].legs.length <= 2)
        {
            lineFunction.insertLine(data.connections[0], idzone).then(function (line) {
                stationFunction.insertStation(data.connections[0].legs[0]).then(function (station) {
                    station_line.insertLine_Station(line, station).then(function () {
                        data.connections[0].legs[0].stops.forEach(function (stops) {
                            stationFunction.insertStation(stops).then(function (station) {
                                station_line.insertLine_Station(line, station)
                                res.redirect('/sa_line/sa_station/'+line.idLine);
                            })
                        })
                    })
                })
            })
        }
        else
        {
            res.redirect('/sa_line/'+idzone);
        }
    })
});

//permet d'accèder à une ligne
router.get('/sa_line/sa_station/:idline', function(req, res, next) {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect')
    }
    let idline = req.params.idline;
    lineFunction.GetOneLine(idline).then(function (line) {
        res.render('sa_station', {line: line});

    })
});

//permet d'accèder à la personne de contact
router.get('/contact', function(req, res, next) {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect')
    }
    var idzone = req.session.idzone;
    zone.GetOnePersonContact(idzone).then(function (contact) {
            res.render('contact', {zone: idzone, contact: contact});
    })
});

//permet de modifier la personne de contact
router.post('/contact', (req, res, next) => {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect')
    }
    var idzone = req.session.idzone;
    personContactFunction.updatePersonContact(req.body,idzone).then(function () {
        res.render('contact', {zone: idzone});
    })
});

//permet d'accèder au conducteur
router.get('/driver', function(req, res, next) {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect')
    }
    var idzone = req.session.idzone;
    zone.GetOneLogin(idzone, 1).then(function (contact) {
        res.render('driver', {zone: idzone, contact: contact});
    })
});

//permet de modifier le driver
router.post('/driver', (req, res, next) => {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect')
    }
    var idzone = req.session.idzone;
            loginFunction.updateLogin(req.body, idzone, 1).then(function () {
                res.render('driver', {zone: idzone});
            })
});

//permet de delete une ligne
router.post('/sa_line/sa_station/delete/:idline', function(req, res, next) {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect')
    }
    let idline = req.params.idline;
    station_line.deleteLine_Station(idline).then(function () {
        lineFunction.deleteLine(line).then(function () {
            res.redirect('/sadmin/sa_line/' + line.idZone);
        })
    })
});

//permet d'accèder aux réservations
router.get('/reservation', function(req, res, next) {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect')
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
    if(session.login.idRole != 2)
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
    if(session.login.idRole != 2)
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