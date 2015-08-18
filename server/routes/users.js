// users.js

var express = require('express');
var _ = require('lodash');
var errCode = require('../errcode');
var datactx = require('../data/datacontext');

var router = express.Router();

/* GET login. */
router.get('/login', function (req, res) {
    var user = req.user;

    //check repeat login
    if (_.some(datactx.onlineUsers, { name: user.name })) {
        res.status(400).send(errCode.USER_ALREADY_LOGIN);
        return;
    }

    user.lastActivedTime = new Date();

    datactx.onlineUsers.add(user);
    res.json({ user_token: user.id });
});

/* GET online users. */
router.get('/online', function (req, res) {
    var result = _.map(datactx.onlineUsers, function (u) {
        return { id: u.id, name: u.name };
    });
    res.json(result);
});


module.exports = router;