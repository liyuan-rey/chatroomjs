// login.js

var express = require('express');
var datactx = require('../data/datacontext');
var router = express.Router();
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var _ = require('lodash');
var errCode = require('../errcode');

// authenticate
passport.use(new BasicStrategy(
    function (username, password, done) {
        try {
            var user = datactx.users.find({ name: username });

            if (!user || !checkPassword(password, user)) {
                return done(null, false); //errCode.INVALID_USER_PASSWORD
            }

            //check repeat login
            if (_.some(datactx.onlineUsers, { name: username })) {
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
router.get('/', passport.authenticate('basic', { session: false }), function (req, res) {
    var user = req.user;
    user.lastActivedTime = new Date();

    if (datactx.onlineUsers.add(user))
        res.json({ user_token: user.id });
    else
        res.status(400).send('User Login fail.');
});

function checkPassword(password, user) {
    return user.password === password;
}


module.exports = router;