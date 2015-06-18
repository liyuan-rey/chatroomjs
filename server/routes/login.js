// login.js

var express = require('express');
var datactx = require('../data/datacontext');
var router = express.Router();
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var errCode = require('../errcode');

// authenticate
passport.use(new BasicStrategy(
    function (userid, password, done) {
        try {
            var user = findUser(userid);

            if (!user || !checkPassword(user, password)) {
                return done(null, false); //errCode.INVALID_USER_PASSWORD
            }

            if (!checkRepeatLogin(user.name)) {
                return done(null, false); //errCode.USER_ALREADY_LOGIN
            }

            return done(null, user);
        }
        catch (err) {
            return done(err);
        }
    }
));

/* GET login. */
router.get('/', passport.authenticate('basic', {session: false}), function (req, res) {
    var user = req.user;
    user.lastActivedTime = new Date();

    if (datactx.onlineUsers.add(user))
        res.json({user_token: user.id});
    else
        res.status(400).send('User Login fail.');
});

module.exports = router;

function checkPassword(user, password) {
    return user.password === password;
}

function checkRepeatLogin(username) {
    for (var i = 0; i < datactx.onlineUsers.length; i++) {
        if (username === datactx.onlineUsers[i].name) {
            return false;
        }
    }
    return true;
}

function findUser(username) {
    for (var i = 0; i < datactx.users.length; i++) {
        if (username === datactx.users[i].name) {
            return datactx.users[i];
        }
    }
    return null;
}