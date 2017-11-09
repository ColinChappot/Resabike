var express = require('express');
var router = express.Router();
var zoneFunction = require('../modules/zoneFunction');
var lineFunction = require('../modules/lineFunction');
var stationFunction = require('../modules/stationFunction');
var station_line = require('../modules/line_stationFunction');
var loginFunction = require('../modules/loginFunction');
var reservationFunction = require('../modules/reservationFunction');
var personcontactFunction = require('../modules/personContactFunction')
var journeyFunction = require('../modules/journeyFunction')
var journey_reservationFunction = require('../modules/journey_reservationFunction')
var session = require('express-session');

//Permet d'accèder à la page
router.get('/', function(req, res, next) {
    if(session.login.idRole != 3)
    {
        res.redirect('/login/redirect')
    }

    zoneFunction.GetAllZone().then(function (zones) {
        res.render('sa_zone', { zones: zones});
    })
});

//permet de créer une nouvelle zone
router.post('/', (req, res, next) => {
    if(session.login.idRole != 3)
    {
        res.redirect('/login/redirect')
    }
    zoneFunction.insertZone(req.body).then(function (zone) {
        loginFunction.insertLoginRole(req.body.username, req.body.password,zone,2).then(function () {
            personcontactFunction.insertPersonContact(zone.id_zone).then(function () {
                loginFunction.insertLoginRole(zone.name,'password',zone,1).then(function () {
                    res.redirect('/sadmin/sa_line/'+zone.id_zone);
                })
            })
        })
    })
});

// //permet d'accèder à une zone spécifique
router.get('/sa_line/:idzone', function(req, res, next) {
    if(session.login.idRole != 3)
    {
        res.redirect('/login/redirect')
    }

    let idzone = req.params.idzone;
    zoneFunction.GetOneZone(idzone).then(function (zone) {
        lineFunction.GetAllLine(zone.id_zone).then(function (lines) {
            res.render('sa_line', {zone: zone, lines: lines});
        })
    })
});

//permet de delete une zone
router.post('/sa_line/delete', function(req, res, next) {
    if(session.login.idRole != 3)
    {
        res.redirect('/login/redirect')
    }
    let idzone = req.body.id_zone
        zoneFunction.GetZoneWithAllChild(idzone).then(function (zone) {
            if(zone.line === null)
            {
                personcontactFunction.deletePersonContact(idzone).then(function () {
                    zoneFunction.deleteZone(idzone).then(function () {
                        loginFunction.deleteLogin(idzone).then(function () {
                            res.redirect('/sadmin');
                        })
                    })
                })
            }
        })
});

//permet de créer une ligne dans la zone
router.post('/sa_line/:idzone', (req, res, next) => {
    if(session.login.idRole != 3)
    {
        res.redirect('/login/redirect')
    }
    let idzone = req.params.idzone;

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
                                res.redirect('/sadmin/sa_line/'+idzone);
                            })
                        })
                    })
                })
            })
        }
        else
        {
            res.redirect('/sadmin/sa_line/'+idzone);
        }
    })
});

//permet d'accèder à une ligne
 router.get('/sa_line/sa_station/:idline', function(req, res, next) {
     if(session.login.idRole != 3)
     {
         res.redirect('/login/redirect')
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
             res.render('sa_station', {line: line, stations: stations, zone: line.idZone})
         })
     })


});

//permet de delete une ligne
router.post('/sa_line/sa_station/delete', function(req, res, next) {
    if(session.login.idRole != 3)
    {
        res.redirect('/login/redirect')
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
                          res.redirect('/sadmin/sa_line/' + line.idZone);
                      })
                  })
            })
        })
    })
});

module.exports = router;


