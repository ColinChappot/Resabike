var express = require('express');
var router = express.Router();
var lineFunction = require('../modules/lineFunction');
var stationFunction = require('../modules/stationFunction');
var personContactFunction = require('../modules/personContactFunction');
var loginFunction = require('../modules/loginFunction');
var journeyFunction = require('../modules/journeyFunction');
var journey_reservationFunction = require('../modules/journey_reservationFunction');
var reservationFunction = require('../modules/reservationFunction');
var zoneFunction = require('../modules/zoneFunction');
var station_line = require('../modules/line_stationFunction');
var session = require('express-session');
var emailFunction = require('../modules/email')






//permet d'accèder à une zone spécifique
router.get('/a_line', function(req, res, next) {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect')
    }
    var idzone = session.login.idZone;
    zoneFunction.GetOneZone(idzone).then(function (zone) {
        lineFunction.GetAllLine(zone.id_zone).then(function (lines) {
            res.render('a_line', {zone: zone, lines: lines});
        })
    })
});

//permet de créer une ligne dans la zone
router.post('/a_line', (req, res, next) => {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect')
    }
    let idzone = session.login.idZone;

    lineFunction.APILine(req.body).then(function (data) {
        if (data.connections[0].legs.length <= 2)
        {
            lineFunction.insertLine(data.connections[0], idzone).then(function (line) {
                stationFunction.insertStation(data.connections[0].legs[0]).then(function (station) {
                    station_line.insertLine_Station(line, station).then(function () {
                        data.connections[0].legs[0].stops.forEach(function (stops) {
                            stationFunction.insertStation(stops).then(function (station) {
                                station_line.insertLine_Station(line, station)
                            })
                        })
                    }).then(function () {
                        stationFunction.insertStation(data.connections[0].legs[1]).then(function (station) {
                            station_line.insertLine_Station(line, station).then(function () {
                                res.redirect('/admin/a_line');
                            })
                        })
                    })
                })
            })
        }
        else
        {
            res.redirect('/admin/a_line');
        }
    })
});

//permet d'accèder à une ligne
router.get('/a_line/a_station/:idline', function(req, res, next) {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect');
    }
    let idline = req.params.idline;
    let stations = new Array();
    lineFunction.GetOneLine(idline).then(function (line) {
        lineFunction.APILine(line).then(function (data) {
            stations.push(data.connections[0].legs[0])
            data.connections[0].legs[0].stops.forEach(function (stops)
            {
                stations.push(stops)
            })
            stations.push(data.connections[0].legs[1])
        }).then(function () {
            res.render('a_station', {line: line, stations: stations, zone: line.idZone})
        })
    })
});

//permet d'accèder à la personne de contact
router.get('/contact', function(req, res, next) {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect');
    }
    var idzone = session.login.idZone;
    loginFunction.GetOneLogin(idzone, 1).then(function (driver) {
        personContactFunction.GetOnePersonContact(idzone).then(function (contact) {
            res.render('contact', {zone: idzone, contact: contact, driver: driver});
        })
    })
});

//permet de modifier la personne de contact
router.post('/contact/update', (req, res, next) => {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect');
    }
    var idzone = session.login.idZone;
    personContactFunction.updatePersonContact(req.body,idzone).then(function () {
        res.redirect('/admin/a_line')
    })
});


//permet de modifier le driver
router.post('/contact/driver/update', (req, res, next) => {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect');
    }
    var idzone = session.login.idZone;
            loginFunction.updateLogin(req.body, idzone, 1).then(function () {
                res.redirect('/admin/a_line')
            })
});

//permet de delete une ligne
router.post('/a_line/a_station/delete', function(req, res, next) {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect');
    }
    let idline = req.body.id_line;
    lineFunction.GetOneLine(idline).then(function (line) {
        station_line.deleteLine_Station(idline).then(function () {
            lineFunction.deleteLine(idline).then(function () {
                res.redirect('/admin/a_line');
            })
        })
    })
});

//permet d'accèder aux réservations
router.get('/', function(req, res, next) {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect');
    }
    var idzone = session.login.idZone;
  zoneFunction.GetZoneWithAllChild(idzone).then(function (data) {
         res.render('adminLine',{data: data});
  })


});


//permet de refuser une réservation
router.post('/reservation/refuse', function(req, res, next) {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect');
    }
    let idreservation = req.body.idreservation;
    reservationFunction.updateReservation(idreservation, 3).then(function () {
        reservationFunction.GetOneReservation(idreservation).then(function (reservation) {
            personContactFunction.GetOnePersonContact(session.login.idZone).then(function (person) {
                emailFunction.cancel(reservation).then(function (text) {
                    emailFunction.sendMail(reservation.mail,'Reservation cancel',text ).then(function () {
                        res.redirect('/admin');
                    })
                })
            })
        })
    })
});

//permet de confirmer les réservation
router.post('/reservation/confirm', (req, res, next) => {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect');
    }
    let idreservation = req.body.idreservation;
    reservationFunction.updateReservation(idreservation, 1).then(function () {

        //envoi du mail de confirmation

        res.redirect('/admin');
    })


});

module.exports = router;