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

//modif to acces push

//Permet d'accèder à la page
router.get('/', function(req, res, next) {
    // if(session.login.idRole != 4)
    // {
    //       res.redirect('/login/redirect')
    // }
    res.render('user');
    // res.render('user', { zones: zones});
});



//Permet d'accèder aux réservation
router.post('/', function(req, res, next) {
//router.get('/reservation', function(req, res, next) {
    // if(session.login.idRole != 4)
    // {
    //     res.redirect('/login/redirect')
    // }

    lineFunction.APIJourney(req.body).then(function (journeys) {
                res.render('reservation', {journeys: journeys})
    })
});

//permet de poster les informations pour la reservation d une personne, madebyJeff
router.post('/reservation', (req, res, next) => {
    // if(session.login.idRole != 4)
    // {
    //     res.redirect('/login/redirect')
    // }


    lineFunction.APIJourney(req.body).then(function (journeys) {
        lineFunction.GetAllLine(journeys).then(function (lines) {
            lines.forEach(function (line) {
                journeyFunction.insertJourney(line).then(function (journey) {
                    dateFunction.insertDate(req.body).then(function (date) {
                        timeFunction.insertTime(timeTravel).then(function (time) {

                            reservationFunction.insertReservation(req.body,date,time)})
                        })
                    })
                })
            }).then(function () {
                res.redirect('/user/historic')
            })
        })
});



//permet de voir les ancienne réservation
router.get('/historic', function(req, res, next) {
    reservationFunction.GetAllReservationUser(id_login).then(function (reservations) {
        res.render('historic', {reservations: reservations});
    })

});



//test JZ AfminZone a supprimer
router.get('/reservation', function(req, res, next) {
    res.render('reservation');
});

//Permet d'accèder à la page
router.post('/data', function(req, res, next) {
    // if(session.login.idRole != 4)
    // {
    //     res.redirect('/login/redirect')
    // }


   stationFunction.GetOneStationLike(req.body.term).then(function (stations) {
       res.send(stations)
   })


    // res.render('user', { zones: zones});
});

module.exports = router;