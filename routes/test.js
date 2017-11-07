var express = require('express');
var models = require('../models');
var router = express.Router();
var i18n = require('i18n');
var session = require('express-session');
var email = require('../modules/email')

//Permet d'accèder à la page
router.get('/', function(req, res, next) {
    res.render('test', {i18n: i18n});
});


//Permet de changer le language
router.get('/changeLang/:lang', function(req, res, next) {
    res.cookie('i18n', req.params.lang);
    i18n.setLocale(i18n, req.params.lang);
    res.redirect('/test');
});

//envoye de

router.post('/email', function(req, res, next) {

 email.CreateMailReservation(body);
 res.redirect('/test');

});


module.exports = router;