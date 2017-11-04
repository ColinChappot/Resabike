var express = require('express');
var router = express.Router();
var zone = require('../modules/zoneFunction');
var person = require('../modules/personContactFunction');
var login = require('../modules/loginFunction');
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
        res.render('login');
});


module.exports = router;
