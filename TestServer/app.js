var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieSession = require('cookie-session');


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var numberRouter = require('./routes/number');
var numberRouter = require('./routes/number.js');
var mapviewRouter = require('./routes/mapview.js');
var cityviewRouter = require('./routes/cityview.js');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/public/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  name: 'session',
  keys: ['key1'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/number', numberRouter);
app.use('/mapview', mapviewRouter);
app.use('/cityview', cityviewRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
