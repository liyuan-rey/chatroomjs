// app.js

var http = require('http');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var login = require('./routes/login');
var users = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());


app.use('/login', login);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error(http.STATUS_CODES[404]);
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        //res.render('error', {
        //  message: err.message,
        //  error: err
        //});
        res.send(err.stack);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    //res.status(err.status || 500);
    //res.render('error', {
    //  message: err.message,
    //  error: {}
    //});
    res.sendStatus(err.status || 500);
});


module.exports = app;
