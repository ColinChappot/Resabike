var express = require('express');
var models = require('../models');
var router = express.Router();
var session = require('express-session');


//Permet d'accèder à la page
router.get('/', function(req, res, next) {

    res.render('test');

});


module.exports = router;