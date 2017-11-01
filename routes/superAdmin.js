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
    // if(req.session.idrole != 3)
    // {
    //     return;
    // }
    zoneFunction.GetAllZone().then(function (zones) {
        res.render('sa_zone', { zones: zones});
    })
});

//permet de créer une nouvelle zone
router.post('/', (req, res, next) => {
    // if(req.session.idrole != 3)
    // {
    //     return;
    // }
    zoneFunction.insertZone(req.body).then(function (zone) {
        lineFunction.GetAllLine(zone.id_zone).then(function (lines) {
            loginFunction.insertLogin(req.body.username, req.body.password,zone,2).then(function () {
                personcontactFunction.insertPersonContact(zone.id_zone).then(function () {
                    loginFunction.insertLogin(zone.name,'password',zone,1).then(function () {
                        res.render('sa_zone', {zone: zone, lines: lines});
                    })
                })
            })
        })
    })
});

// //permet d'accèder à une zone spécifique
// router.get('/zone/:idzone', function(req, res, next) {
router.get('/sa_line', function(req, res, next) {
    // if(req.session.idrole != 3)
    // {
    //     return;
    // }
    let idzone = req.params.idzone;
    zoneFunction.GetOneZone(idzone).then(function (zone) {
        lineFunction.GetAllLine(zone.id_zone).then(function (lines) {
            res.render('sa_line', {zone: zone, lines: lines});
        })
    })
});

//permet de delete une zone
router.delete('/zone/:idzone', function(req, res, next) {
    if(req.session.idrole != 3)
    {
        return;
    }
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

// //permet de créer une ligne dans la zone
// router.post('/zone/:idzone', (req, res, next) => {
//     if(req.session.idrole != 3)
//     {
//         return;
//     }
//     let idzone = req.params.idzone;
//     lineFunction.CreateLine(req.body).then(function (data) {
//         if (data.connections[0].legs.size() <= 2)
//         {
//             lineFunction.insertLine(data.connections[0], idzone).then(function (line) {
//                 stationFunction.insertStation(data.connections[0].legs[0]).then(function (station) {
//                     station_line.insertLine_Station(line, station).then(function () {
//                         data.connections[0].legs[1].stops.each(function (stops) {
//                             stationFunction.insertStation(stops).then(function (station) {
//                                 station_line.insertLine_Station(line, station).then(function () {
//                                 })
//                             })
//                         })
//                     })
//                 })
//             }).then(function () {
//                 res.render('line', {line: line, idzone: idzone});
//             })
//         }
//         else
//         {
//             res.redirect('/zone/'+idzone);
//         }
//     })
// });
//
// //permet d'accèder à une ligne
// router.get('/zone/line/:idline', function(req, res, next) {
    router.get('/sa_zone/sa_line', function(req, res, next) {
    if(req.session.idrole != 3)
    {
        return;
    }
    let idline = req.params.idline;
    lineFunction.GetOneLine(idline).then(function (line) {
        station_line.GetAllStation(line).then(function (idStation) {
            stationFunction.GetAllStationFromLine(line, idStation).then(function (stations) {
                res.render('sa_station', {stations: stations, idline: idline, idzone: line.idZone});
            })
        })
    })
});

// //permet de delete une ligne
// router.delete('/zone/line/:idline', function(req, res, next) {
//     if(req.session.idrole != 3)
//     {
//         return;
//     }
//     let idline = req.params.idline;
//     station_line.deleteLine_Station(idline).then(function () {
//         lineFunction.deleteLine(line).then(function () {
//             res.redirect('/zone/' + line.idZone);
//         })
//     })
// });

module.exports = router;


