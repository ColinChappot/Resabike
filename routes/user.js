var express = require('express');
var models = require('../models');
var router = express.Router();
var session = require('express-session');


//Permet d'accèder à la page
router.get('/', function(req, res, next) {
    if(session.login.idRole != 4)
    {
          res.redirect('/login/redirect')
    }
    res.render('user');
    // res.render('user', { zones: zones});
});



//Permet d'accèder aux réservation
router.get('/reservation/:idJourney', function(req, res, next) {
    if(session.login.idRole != 4)
    {
        res.redirect('/login/redirect')
    }
    let idJourney = req.params.idJourney;
    journeyFunction.insertJourney(idJourney).then(function (journey) {
        res.render('reservation', {journey: journey});
    })
});

//permet de poster les informations pour la reservation d une personne, madebyJeff
router.post('/reservation', (req, res, next) => {
    if(session.login.idRole != 4)
    {
        res.redirect('/login/redirect')
    }
    reservationFunction.insertReservation(req.body).then(function () {
        res.render('historique', {})
    })
});

module.exports = router;