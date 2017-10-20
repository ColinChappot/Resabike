var f = require('./modules/database');

f.test().then(function (personcontact) {
    console.log(personcontact.firstname);
});