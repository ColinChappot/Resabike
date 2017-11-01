var express = require('express');
var models = require('../models');
var router = express.Router();


//Permet d'accèder à la page
router.get('/', function(req, res, next) {
    // if(req.session.idrole != 4)
    // {
    //     return;
    // }
    res.render('user');
    // res.render('user', { zones: zones});
});



//Permet d'accèder aux réservation
router.get('/reservation', function(req, res, next) {
    // if(req.session.idrole != 4)
    // {
    //     return;
    // }

    //test si on est logé ou pas si oui on go reservation, sinon on go sur registration
    // if(req.session.authenticated==true){
    //     res.render('reservation', { zones: zones});
    // }else{
    //     res.render('registration');
    // }

    res.render('reservation', { zones: zones});

});

//permet de poster les informations pour la reservation d une personne, madebyJeff
router.post('/reservation', (req, res, next) => {
    reservationFunction.insertReservation(req.body).then(function () { res.render('/user');
    })
});

module.exports = router;