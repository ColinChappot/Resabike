var express = require('express');
var router = express.Router();
var zoneFunction = require('../modules/zoneFunction')
var session = require('express-session');


//Access to all the reservation for the zone
router.get('/', function(req, res, next) {
    if(session.login.idRole != 1)
    {
        res.redirect('/login/redirect')
    }

    var idzone = session.login.idZone;
    zoneFunction.GetZoneWithAllChildConfirm(idzone).then(function (data) {
        res.render('driver',{data: data});
    })
});
module.exports = router;
