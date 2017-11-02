var express = require('express');
var router = express.Router();
var lineFunction = require('../modules/lineFunction');
var journeyFunction = require('../modules/journeyFunction');
var journey_reservationFunction = require('../modules/journey_reservationFunction');
var reservationFunction = require('../modules/reservationFunction');
var session = require('express-session');


router.get('/', function(req, res, next) {
    if(session.login.idRole != 1)
    {
        res.redirect('/login/redirect')
    }

    res.render('driver');
});


//permet d'accèder aux réservations
router.post('/reservation', function(req, res, next) {
    if(session.login.idRole!= 1)
    {
        res.redirect('/login/redirect')
    }
    var data = {};
    var dataline ;
    var dataJourney;

    var idzone = req.session.idzone;
    lineFunction.GetAllLine(idzone).then(function (lines) {
        lines.each(function (line) {
            journeyFunction.GetAllJourney(lines.id_line).then(function (journeys) {
                journeys.journey.each(function (journey) {
                    journey_reservationFunction.GetAllStation(journey).then(function (journey_reservations) {
                        journey_reservations.journey_reservation.each(function (journey_reservation) {
                            reservationFunction.GetAllReservationByJourneyConfirmed(journey_reservation).then(function (reservations) {
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
        })
    }).then(function () {
        res.render('reservation', {data: data});
    })
});

module.exports = router;
