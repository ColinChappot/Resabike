var express = require('express');
var router = express.Router();
var models = require('../models');
var zone = require('../modules/zoneFunction');
var person = require('../modules/personContactFunction');


router.get('/', (req, res, next) => {
    res.render('zone');
});



