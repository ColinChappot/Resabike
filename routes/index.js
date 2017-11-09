var express = require('express');
var router = express.Router();
var i18n = require('i18n');
var emailFunction = require('../modules/email');

/* GET home page. */
router.get('/', function(req, res, next) {
        res.render('index', {i18n:i18n});
});
//Send email from the user for the feedback for resabike
router.post('/feedback', function(req, res, next) {
    emailFunction.sendMail('resabikeCCJZ@gmail.com',"Feedback",req.body.message).then(function () {
        res.redirect("/");
    })
});


module.exports = router;
