var express = require('express');
var loginFunction = require('../modules/loginFunction');
var session = require('express-session');
var router = express.Router();
var i18n = require('i18n');

//Change the language for the user
router.get('/changeLang/:lang', function(req, res, next) {
    res.cookie('i18n', req.params.lang);
    i18n.setLocale(i18n, req.params.lang);
    res.redirect('/login');
});


/* Logout handler */
router.get('/', function(req, res, next) {
    res.render('login', {i18n: i18n, erreur: false});
});

//Check if the login is correct and redirect the user
router.post('/', (req, res, next) => {

    loginFunction.CheckLogin(req.body).then(function (check) {
        if(check != null)
        {
            session.authenticated = true;

            session.login = check.dataValues;
            res.redirect('/login/redirect')
        }
        else
        {
            res.render('login', {i18n: i18n, erreur: true})
        }
    })


});

//Access to the login creation
router.get('/registration', function(req, res, next) {
    res.render('registration',  {i18n: i18n});
});

//Create a new login for the user
router.post('/registration', (req, res, next) => {
   loginFunction.insertLogin(req.body.username,req.body.password,4).then(function () {
       res.render('login', {i18n: i18n});
   })
});

/* Logout handler */
router.get('/redirect', function(req, res, next) {


    var ok = session.login

    switch(session.login.idRole)
    {
        case 1: res.redirect('/driver')
            break;
        case 2: res.redirect('/admin')
            break;
        case 3: res.redirect('/sadmin')
            break;
        case 4: res.redirect('/user')
            break;
    }
});

//logout
router.get('/logout', function(req, res, next) {
    session.authenticated = false
    session.login = null
    res.redirect('/login', {i18n: i18n})
});




module.exports = router;