var express = require('express');
var models = require('../models');
var router = express.Router();
var i18n = require('i18n');
var session = require('express-session');


//Permet d'accèder à la page
router.get('/', function(req, res, next) {
    res.render('test', {i18n: i18n});
});


//Permet d'accèder à la page
router.get('/changeLang/:lang', function(req, res, next) {
    res.cookie('i18n', req.params.lang);
    res.setLocale(i18n, req.params.lang);
    res.render('test', {i18n: i18n});
});

module.exports = router;