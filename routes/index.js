var express = require('express');
var router = express.Router();
var zone = require('../modules/zoneFunction');
var person = require('../modules/personContactFunction');
var login = require('../modules/loginFunction');
var models = require('../models');

/* GET home page. */
router.get('/', function(req, res, next) {
        res.render('index');
});

router.post('/', (req, res, next) => {
    zone.insertZone(req.body).then(function (zone) {
        person.insertPersonContact(req.body, zone).then(function () {
            login.insertLogin(req.body,zone,2).then(function () {
                res.render('index', {title: 'Express'});
            })
       })
    })
});

module.exports = router;
