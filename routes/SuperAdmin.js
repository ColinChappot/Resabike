var express = require('express');
var router = express.Router();
var zone = require('../modules/zoneFunction');
var zone = require('../modules/lineFunction');

//Permet d'accèder à la page
router.get('/', function(req, res, next) {
    zone.GetAllZone().then(function (zones) {
        res.render('admin', { zones: zones});
    })
});

//permet de créer une nouvelle zone
router.post('/', (req, res, next) => {
    zone.insertZone(req.body).then(function (zone) {
        login.insertLogin(req.body,zone,2).then(function () {
            res.render('index', {title: 'Express'});
        })
    })
});

//peremet d'accèder à une zone spécifique
router.get('/zone', function(req, res, next) {
    zone.GetOneZone(req.body).then(function (zone) {
        line.GetAllLine(zone.id_zone).then(function (lines) {
            res.render('zone', {zone: zone, lines: lines});
        })
    })
});

//peremet de créer une ligne dans la zone
router.post('/zone', (req, res, next) => {
    zone.insertLine(req.body).then(function (line) {
            res.render('line', {line: line});
    })
});

//permet d'accèder à une ligne
router.get('/zone/line', function(req, res, next) {
    line.GetOneLine(req.body).then(function (line) {
            res.render('line', {line: line});
    })
});
