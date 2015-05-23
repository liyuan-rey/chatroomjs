// server.js

var http = require('http');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var login = require('./api/login');
var users = require('./api/users');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/login', login);
app.use('/api/users', users);

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
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        //res.render('error', {
        //    message: err.message,
        //    error: err
        //});
        res.send(err.stack);
    });
} else {
// production error handler
// no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        //res.status(err.status || 500);
        //res.render('error', {
        //    message: err.message,
        //    error: {}
        //});
        res.sendStatus(err.status || 500);
    });
}

// starting server
var debug = require('debug')('charroom:server');
app.set('port', process.env.PORT || 3000);
//var server = app.listen(app.get('port'), function () {
//    debug('Express server [chatroom] listening on port ' + server.address().port);
//});
var server = http.createServer(app);
server.listen(app.get('port'), 'localhost', 511, function () {
    debug('Express server [chatroom] listening on %j', server.address());
});

// binding websocket
var debug2 = require('debug')('charroom:server_socket');
var ws = require('socket.io').listen(server);
ws.sockets.on('connection', function (socket) {
    debug2('client connected with server');
});


module.exports = app;
