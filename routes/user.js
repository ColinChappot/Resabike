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
    res.render('reservation', { zones: zones});
});

module.exports = router;