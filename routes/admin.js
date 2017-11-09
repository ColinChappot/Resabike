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






//Access to a specific zone
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

//Creation of a line in the zone
router.post('/a_line', (req, res, next) => {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect')
    }
    let idzone = session.login.idZone;

    lineFunction.APILine(req.body).then(function (data) {
        if (data.connections[1].legs.stops !== null)
        {

            lineFunction.insertLine(data.connections[1], idzone).then(function (line) {
                stationFunction.insertStation(data.connections[1].legs[0]).then(function (station) {
                    station_line.insertLine_Station(line, station).then(function () {
                        data.connections[1].legs[0].stops.forEach(function (stops) {
                            stationFunction.insertStation(stops).then(function (station) {
                                station_line.insertLine_Station(line, station)
                            })
                        })
                    }).then(function () {
                        stationFunction.insertStation(data.connections[1].legs[0].exit).then(function (station) {
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

//Access to a specific line
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

//Access to the contact person of the zone
router.get('/contact', function(req, res, next) {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect');
    }
    var idzone = session.login.idZone;
    loginFunction.GetOneLogin(idzone, 1).then(function (driver) {
        personContactFunction.GetOnePersonContact(idzone).then(function (contact) {
            res.render('contact', {zone: idzone, contact: contact, driver: driver, messageContact:"", messageDriver:""});
        })
    })
});

//Modify the contact person of the zone
router.post('/contact/update', (req, res, next) => {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect');
    }
    var idzone = session.login.idZone;
    personContactFunction.updatePersonContact(req.body,idzone).then(function () {
        loginFunction.GetOneLogin(idzone, 1).then(function (driver) {
            personContactFunction.GetOnePersonContact(idzone).then(function (contact) {
                res.render('contact', {zone: idzone, contact: contact, driver: driver, messageContact:"Contact modified", messageDriver:""});
            })
        })
    })
});


//Modify the bus driver of the zone
router.post('/contact/driver/update', (req, res, next) => {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect');
    }
    var idzone = session.login.idZone;
        loginFunction.updateLogin(req.body, idzone, 1).then(function () {
            loginFunction.GetOneLogin(idzone, 1).then(function (driver) {
                personContactFunction.GetOnePersonContact(idzone).then(function (contact) {
                    res.render('contact', {zone: idzone, contact: contact, driver: driver, messageContact:"", messageDriver:"Driver modified"});
                })
            })
        })
});

//Delete a line
router.post('/a_line/a_station/delete', function(req, res, next) {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect');
    }
    let idline = req.body.id_line;
    lineFunction.GetOneLine(idline).then(function (line) {
        station_line.deleteLine_Station().then(function () {
            journeyFunction.GetAllJourney(line.id_line).then(function (journeys) {
                journeys.forEach(function (journey) {
                    journey_reservationFunction.GetAllJourney_Reservation(journey.id_journey).then(function (reservations) {
                        reservations.forEach(function (reservation) {
                            reservationFunction.deleteReservation(reservation.idReservation)
                            journey_reservationFunction.deleteJourney_Reservation(reservation.idReservation)
                        })
                    })
                })
            }).then(function () {
                journeyFunction.deleteJourney(line.id_line).then(function () {
                    lineFunction.deleteLine(idline).then(function () {
                        res.redirect('/admin/a_line');
                    })
                })
            })
        })
    })
});

//Access to the reservations
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


//Refuse a reservation
router.post('/reservation/refuse', function(req, res, next) {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect');
    }
    let idreservation = req.body.idreservation;
    reservationFunction.updateReservation(idreservation, 3).then(function () {
        reservationFunction.GetOneReservation(idreservation).then(function (reservation) {
            personContactFunction.GetOnePersonContact(session.login.idZone).then(function (person) {
                emailFunction.cancel(reservation,person).then(function (text) {
                    emailFunction.sendMail(reservation.mail,'Reservation cancel',text ).then(function () {
                        res.redirect('/admin');
                    })
                })
            })
        })
    })
});

//Confirm a reservation
router.post('/reservation/confirm', (req, res, next) => {
    if(session.login.idRole != 2)
    {
        res.redirect('/login/redirect');
    }

    let idreservation = req.body.idreservation;
    reservationFunction.updateReservation(idreservation, 1).then(function () {
        reservationFunction.GetOneReservation(idreservation).then(function (reservation) {

                var body= new Object();
                body.date = reservation.date.dataValues.day+"."+reservation.date.dataValues.month+"."+reservation.date.dataValues.year;
                body.from = reservation.from;
                body.to = reservation.to;
                body.time = reservation.time.dataValues.hour+":"+reservation.time.dataValues.minute;

            lineFunction.APIJourney(body).then(function (trajet) {
                personContactFunction.GetOnePersonContact(session.login.idZone).then(function (person) {
                    emailFunction.confirm(person,trajet[1].legs[0]).then(function (text) {
                        emailFunction.sendMail(reservation.mail,'confirmation',text).then(function () {
                            res.redirect('/admin');
                        })
                    })
                })
            })
        })
    })


});

module.exports = router;