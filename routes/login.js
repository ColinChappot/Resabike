var express = require('express');
var models = require('../models');
var loginFunction = require('../modules/loginFunction');
var session = require('express-session');
var router = express.Router();




/* Logout handler */
router.get('/', function(req, res, next) {
    res.render('login', {erreur:""});
});

//permet de modifier la personne de contact
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
            res.render('login', {erreur:'Utilisateur ou mot de passe incorrecte'})
        }
    })
});

/* Logout handler */
router.get('/registration', function(req, res, next) {
    res.render('registration');
});

//permet de modifier la personne de contact
router.post('/registration', (req, res, next) => {
   loginFunction.insertLogin(req.body.username,req.body.password,4).then(function () {
       res.render('login');
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
    res.redirect('/login')
});




module.exports = router;