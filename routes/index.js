var express = require('express');
var router = express.Router();
var zone = require('../modules/zoneFunction');
var person = require('../modules/personContactFunction');
var login = require('../modules/loginFunction');
var models = require('../models');
var i18n = require('i18n');

/* GET home page. */
router.get('/', function(req, res, next) {
        res.render('index', {i18n:i18n});
});


module.exports = router;
