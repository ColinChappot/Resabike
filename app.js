var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');

//PUG added
var login = require('./routes/login');
var registration = require('./routes/login');
var user = require('./routes/user');
var reservation = require('./routes/user');
var sadmin = require('./routes/superAdmin');
var sa_zone = require('./routes/superAdmin');
var sa_line = require('./routes/superAdmin');
var sa_station = require('./routes/superAdmin');
var admin = require('./routes/admin');
var driver = require('./routes/driver');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
//PUG added
app.use('/login', login);
app.use('/login/registration', registration)
app.use('/user', user);
app.use('/reservation', reservation)
app.use('/sadmin', sadmin);
app.use('/sadmin/sa_zone', sa_line)
app.use('/sadmin/sa_zone/sa_line', sa_station)
app.use('/admin', admin)
app.use('/driver', driver)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// use session
app.use(session({
    secret:'badger badger badger mushroom',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

});

module.exports = app;
