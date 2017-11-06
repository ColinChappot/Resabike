var express = require('express');
var router = express.Router();
var zoneFunction = require('../modules/zoneFunction')
var session = require('express-session');


//permet d'accèder aux réservations
router.get('/', function(req, res, next) {
    if(session.login.idRole != 1)
    {
        res.redirect('/login/redirect')
    }

    var idzone = session.login.idZone;
    zoneFunction.GetZoneWithAllChild(idzone).then(function (data) {
        res.render('driver',{data: data});
    })
});
module.exports = router;
