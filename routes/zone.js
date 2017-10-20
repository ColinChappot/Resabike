var express = require('express');
var router = express.Router();
var models = require('../models');
var test = require('../modules/testF')


router.get('/', (req, res, next) => {
    res.render('zone');
});

router.post('/', (req, res, next) => {
test.test(req.body).then(function () {
    res.render('index');

})
});

