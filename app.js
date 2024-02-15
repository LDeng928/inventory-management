var createError = require('http-errors');
var express = require('express');
var path = require('path');
//var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var storeRouter = require('./routes/store');
var productRouter = require('./routes/product');
var orderRouter = require('./routes/order');
var pdfRouter = require('./routes/pdf');
var reportRouter = require('./routes/report');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(
  session({
    secret: 'superrandomsecret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/store', storeRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/pdf', pdfRouter);
app.use('/report', reportRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
