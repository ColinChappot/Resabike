var express = require('express');
var router = express.Router();
var zoneFunction = require('../modules/zoneFunction');
var lineFunction = require('../modules/lineFunction');
var stationFunction = require('../modules/stationFunction');
var station_line = require('../modules/line_stationFunction');
var loginFunction = require('../modules/loginFunction');
var personcontactFunction = require('../modules/personContactFunction')

//Permet d'accèder à la page
router.get('/', function(req, res, next) {
    zoneFunction.GetAllZone().then(function (zones) {
        res.render('admin', { zones: zones});
    })
});

//permet de créer une nouvelle zone
router.post('/', (req, res, next) => {
    zoneFunction.insertZone(req.body).then(function (zone) {
        lineFunction.GetAllLine(zone.id_zone).then(function (lines) {
            loginFunction.insertLogin(req.body,zone,2).then(function () {
                res.render('zone', {zone: zone, lines: lines});
            })
        })
    })
});

//permet d'accèder à une zone spécifique
router.get('/zone/:idzone', function(req, res, next) {
    let idzone = req.params.idzone;
    zoneFunction.GetOneZone(idzone).then(function (zone) {
        lineFunction.GetAllLine(zone.id_zone).then(function (lines) {
            res.render('zone', {zone: zone, lines: lines});
        })
    })
});

//permet de delete une zone
router.delete('/zone/:idzone', function(req, res, next) {
    let idzone = req.params.idzone;
    lineFunction.GetAllLine(idzone).then(function (lines) {
        lines.idline.each(function (idline) {
            station_line.deleteLine_Station(idline).then(function () {
            })
        })
    }).then(function () {
        lineFunction.deleteLine(idzone).then(function () {
            zoneFunction.deleteZone(idzone).then(function () {
                loginFunction.deleteLogin(idzone).then(function () {
                    personcontactFunction.deletePersonContact(idzone).then(function () {
                        res.redirect('/');
                    })
                })
            })
        })
    })
});

//permet de créer une ligne dans la zone
router.post('/zone/:idzone', (req, res, next) => {
    let idzone = req.params.idzone;
    lineFunction.CreateLine(req.body).then(function (data) {
        if (data.connections[0].legs.size() <= 2)
        {
            lineFunction.insertLine(data.connections[0], idzone).then(function (line) {
                stationFunction.insertStation(data.connections[0].legs[0]).then(function (station) {
                    station_line.insertLine_Station(line, station).then(function () {
                        data.connections[0].legs[1].stops.each(function (stops) {
                            stationFunction.insertStation(stops).then(function (station) {
                                station_line.insertLine_Station(line, station).then(function () {
                                })
                            })
                        })
                    })
                })
            }).then(function () {
                res.render('line', {line: line, idzone: idzone});
            })
        }
        else
        {
            res.redirect('/zone/'+idzone);
        }
    })
});

//permet d'accèder à une ligne
router.get('/zone/line/:idline', function(req, res, next) {
    let idline = req.params.idline;
    lineFunction.GetOneLine(idline).then(function (line) {
        station_line.GetAllStation(line).then(function (idStation) {
            stationFunction.GetAllStationFromLine(line, idStation).then(function (stations) {
                res.render('line', {stations: stations, idline: idline, idzone: line.idZone});
            })
        })
    })
});

//permet de delete une ligne
router.delete('/zone/line/:idline', function(req, res, next) {
    let idline = req.params.idline;
    station_line.deleteLine_Station(idline).then(function () {
        lineFunction.deleteLine(line).then(function () {
            res.redirect('/zone/' + line.idZone);
        })
    })
});


