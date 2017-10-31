var express = require('express');
var models = require('../models');
var loginFunction = require('../modules/loginFunction');
var router = express.Router();



/* Logout handler */
router.get('/', function(req, res, next) {
    res.render('login');
});

//permet de modifier la personne de contact
router.post('/', (req, res, next) => {

    loginFunction.CheckLogin(req.body).then(function (check) {
        if(check != null)
        {
            req.session.authenticated = true;
            req.session.idzone = check.idzone;
            req.session.idrole = check.idrole;

            switch(idrole)
            {
                case 0: res.redirect('/user')
                    break;
                case 1: res.redirect('/driver')
                    break;
                case 2: res.redirect('/admin')
                    break;
                case 3: res.redirect('/superAdmin')
                    break;
            }
        }
    })


});

/* Logout handler */
router.get('/registation', function(req, res, next) {
    res.render('registation');
});

//permet de modifier la personne de contact
router.post('/registation', (req, res, next) => {
   loginFunction.insertLogin(req.body.username,req.body.password,1).then(function () {
       res.render('login');
   })
});


module.exports = router;