var express = require('express');
var models = require('../models');
var router = express.Router();
var session = require('express-session');
var stationFunction = require('../modules/stationFunction');
var reservationFunction = require('../modules/reservationFunction');
var journeyFunction = require('../modules/journeyFunction');
var lineFunction = require('../modules/lineFunction');
var dateFunction = require('../modules/dateFunction');
var timeFunction = require('../modules/timeFunction');
var journey_reservationFunction = require('../modules/journey_reservationFunction');
var personConctactFunction = require('../modules/personContactFunction');
var emailFunction = require('../modules/email');
var i18n = require('i18n');

//modif to acces push

//Permet d'accèder à la page
router.get('/', function(req, res, next) {
    // if(session.login.idRole != 4)
    // {
    //       res.redirect('/login/redirect')
    // }
    res.render('user', {i18n: i18n});
    // res.render('user', { zones: zones});
});



//Permet d'accèder aux réservation
router.post('/', function(req, res, next) {
//router.get('/reservation', function(req, res, next) {
    if(session.login.idRole != 4)
    {
        res.redirect('/login/redirect')
    }

    lineFunction.APIJourney(req.body).then(function (journeys) {
                res.render('reservation', {journeys: journeys[0], i18n:i18n})
    })
});

//permet de poster les informations pour la reservation d une personne, madebyJeff
router.post('/reservation', (req, res, next) => {
    if(session.login.idRole != 4)
    {
        res.redirect('/login/redirect')
    }

    let idzone ;
    let confirmation;

    lineFunction.APIJourney(req.body).then(function (journeys) {
        journeys[0].legs.forEach(function (trajet) {
            if (trajet.stops != null) {
                lineFunction.GetOneLineByName(trajet.line).then(function (line) {
                    idzone = line.idZone;
                    journeyFunction.insertJourney(trajet, line).then(function (journey) {
                        dateFunction.insertDate(req.body.date).then(function (date) {
                            timeFunction.insertTime(req.body.time).then(function (time) {
                                journey_reservationFunction.CheckNbBike(journey).then(function (nbBike) {
                                    nbBike = nbBike + req.body.bikeNumber;
                                    if (nbBike > 6) {
                                        reservationFunction.insertReservation(req.body, 2, date, time, session.login.id_login).then(function (reservation) {
                                            journey_reservationFunction.insertJourney_Reservation(journey, reservation).then(function () {
                                                personConctactFunction.GetOnePersonContact(idzone).then(function (person) {
                                                    emailFunction.Waiting(person).then(function (text) {
                                                        emailFunction.sendMail(req.body.mail,'waiting',text).then(function () {
                                                            res.redirect('/user/historic')
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    }
                                    else {
                                        reservationFunction.insertReservation(req.body, 1, date, time, session.login.id_login).then(function (reservation) {
                                            journey_reservationFunction.insertJourney_Reservation(journey, reservation).then(function () {
                                                personConctactFunction.GetOnePersonContact(idzone).then(function (person) {
                                                    emailFunction.confirm(person).then(function (text) {
                                                        emailFunction.sendMail(req.body.mail,'confirmation',text).then(function () {
                                                            res.redirect('/user/historic')
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    }
                                })

                            })
                        })
                    })
                })
            }
        })
    })
});



//permet de voir les ancienne réservation
router.get('/historic', function(req, res, next) {

    if(session.login.idRole != 4)
    {
        res.redirect('/login/redirect')
    }

    var id_login = session.login.id_login
    reservationFunction.GetAllReservationUser(id_login).then(function (reservations) {
        res.render('historic', {reservations: reservations,  i18n: i18n});
    })

});





//Permet d'accèder à la page
router.post('/data', function(req, res, next) {
    if(session.login.idRole != 4)
    {
        res.redirect('/login/redirect')
    }
   stationFunction.GetOneStationLike(req.body.term).then(function (stations) {
       res.send(stations)
   })

});


//permet de delete une réservation
router.post('/historic/delete', function(req, res, next) {
    if(session.login.idRole !=4 )
    {
        return;
    }
    let idreservation = req.body.idreservation;
    journey_reservationFunction.deleteJourney_Reservation(idreservation).then(function () {
    reservationFunction.deleteReservation(idreservation).then(function () {
            res.redirect('/user/historic');
        })
    })
});

module.exports = router;