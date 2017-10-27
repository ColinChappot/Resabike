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



//permet d'accèder à une zone spécifique
router.get('/', function(req, res, next) {
    var idzone = req.session.idzone;
    zone.GetOneZone(idzone).then(function (zone) {
        lineFunction.GetAllLine(zone.id_zone).then(function (lines) {
            res.render('zone', {zone: zone, lines: lines});
        })
    })
});

//permet de créer une ligne dans la zone
router.post('/', (req, res, next) => {
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
            res.redirect('/zone/'+idzone);
        }
    })
});

//permet d'accèder à une ligne
router.get('/line', function(req, res, next) {
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
    var idzone = req.session.idzone;
    zone.GetOnePersonContact(idzone).then(function (contact) {
            res.render('contact', {zone: idzone});
    })
});

//permet de modifier la personne de contact
router.post('/contact', (req, res, next) => {
    var idzone = req.session.idzone;
    personContactFunction.GetOnePersonContact(idzone).then(function (person) {
        if(person.idzone= null)
        {
            personContactFunction.insertPersonContact(req.body,idzone).then(function () {
                res.render('contact', {zone: idzone});
            })
        }
        else
        {
            personContactFunction.updatePersonContact(req.body,idzone).then(function () {
                res.render('contact', {zone: idzone});
            })
        }
    })
});

//permet d'accèder au conducteur
router.get('/driver', function(req, res, next) {
    var idzone = req.session.idzone;
    zone.GetOneLogin(idzone, 1).then(function (contact) {
        res.render('driver', {zone: idzone});
    })
});

//permet de modifier la personne de contact
router.post('/driver', (req, res, next) => {
    var idzone = req.session.idzone;
    loginFunction.GetOneLogin(idzone,1).then(function (login) {
        if(login.idzone= null)
        {
            loginFunction.insertLogin(req.body, idzone, 1).then(function () {
                res.render('driver', {zone: idzone});
            })
        }
        else
        {
            loginFunction.updateLogin(req.body, idzone, 1).then(function () {
                res.render('driver', {zone: idzone});
            })
        }
    })
});

//permet de delete une ligne
router.delete('/zone/line/:idline', function(req, res, next) {
    let idline = req.params.idline;
    station_lineFunction.deleteLine_Station(idline).then(function () {
        lineFunction.deleteLine(line).then(function () {
            res.redirect('/zone/' + line.idZone);
        })
    })
});

//permet d'accèder aux réservations
router.get('/reservation', function(req, res, next) {
    var idzone = req.session.idzone;
    lineFunction.GetAllLine(idzone).then(function (lines) {
        lines.id_line.each(function (id_line) {
            journeyFunction.GetAllJourney(id_line).then(function (journeys) {
                journeys.each(function (journey) {
                    journey_reservationFunction.GetAllStation(journey).then(function (journey_reservation) {
                        reservationFunction.GetAllReservation(journey_reservation).then(function (reservations) {
                            res.render('reservation', {reservations: reservations});
                        })
                    })
                })
            })
        })
    })
});

//permet de delete une réservation
router.delete('/reservation/:idreservation', function(req, res, next) {
    let idreservation = req.params.idreservation;
    reservationFunction.deleteReservation(idreservation).then(function () {
        journey_reservationFunction.deleteJourney_Reservation(idreservation).then(function () {
            res.redirect('/reservation');
        })
    })
});
