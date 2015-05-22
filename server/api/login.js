// login.js

var express = require('express');

var datactx = require('../data/datacontext')
var User = require('../data/user');

var router = express.Router();

/* login */
router.get('/', function (req, res) {
    
    if (!checkUser('', '')){
        res.status(403).send('Access Denied.');
        return;
    }

    var user = new User('admin', '123456');
    user.lastActivedTime = Date.now();

    if (datactx.onlineUsers.add(user))
        res.json({ user_token: user.id });
    else
        res.status(400).send('User has already logged in.');
});


module.exports = router;

function checkUser(username, password) {
    return true;
}