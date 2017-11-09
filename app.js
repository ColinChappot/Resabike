var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var i18n = require('i18n');
var app = express();


var index = require('./routes/index');
//PUG added
var login = require('./routes/login');
var user = require('./routes/user');
var sadmin = require('./routes/sadmin');
var admin = require('./routes/admin');
var driver = require('./routes/driver');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
//PUG added
app.use('/login', login);
app.use('/user', user);
app.use('/sadmin', sadmin);
app.use('/admin', admin)
app.use('/driver', driver)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(cookieParser());
// use session
app.use(session({
    secret:'badger badger badger mushroom',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//i118n multi-langs
i18n.configure({
    // setup some locales - other locales default to en silently
    locales:['fr', 'en', 'de'],

    // where to store json files - defaults to './langs' relative to modules directory
    directory: __dirname + '/public/locale',

    defaultLocale: 'en',
    // sets a custom cookie name to parse locale settings from  - defaults to NULL
    cookie: 'lang',
    extension: '.json'
});


app.use(cookieParser());

app.use(i18n.init);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

});

module.exports = app;
