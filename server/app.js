// app.js

var http = require('http');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var _ = require('lodash');

var errCode = require('./errcode');
var datactx = require('./data/datacontext');
var chats = require('./routes/chats');
var users = require('./routes/users');

// begin app bootstrap
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

// authentication initialize
app.use(passport.initialize());

passport.use(new BasicStrategy(
    function (username, password, done) {
        try {
            var user = datactx.users.find({ name: username });

            if (!user || !checkPassword(password, user)) {
                return done(null, false); //errCode.INVALID_USER_PASSWORD
            }

            return done(null, user);
        }
        catch (err) {
            return done(err);
        }
    }
));

function checkPassword(password, user) {
    return user.password === password;
}

// app routes setup
app.use('/api/chats', chats);
app.use('/api/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error(http.STATUS_CODES[404]);
    err.status = 404;
    next(err);
});

// error handlers
if (app.get('env') === 'development') { // development error handler will print stacktrace
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        //res.render('error', {
        //  message: err.message,
        //  error: err
        //});
        res.send(err.stack);
    });
}

// production error handler no stacktraces leaked to user
app.use(function (err, req, res, next) {
    //res.status(err.status || 500);
    //res.render('error', {
    //  message: err.message,
    //  error: {}
    //});
    res.sendStatus(err.status || 500);
});


module.exports = app;