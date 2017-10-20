var express = require('express');
var models = require('../models');
var router = express.Router();



/* Logout handler */
router.get('/', function(req, res, next) {
    res.render('login');
});

module.exports = router;