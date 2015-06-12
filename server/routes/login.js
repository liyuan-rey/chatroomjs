// login.js

var express = require('express');
var datactx = require('../data/datacontext')
var router = express.Router();

/* GET login. */
router.get('/', function (req, res) {
    
    //for debug mock
    req.username = 'admin';
    req.password = '123456';

    if (!checkPassword(req.username, req.password)){
        res.status(403).send('Access Denied.');
        return;
    }
    
    if (!checkRepeatLogin(req.username)) {
        res.status(400).send('User has already logged in.');
        return;
    }
    
    var user = findUser(req.username);
    
    if (user == null) {
        res.status(400).send('User has not registed.');
        return;
    }

    user.lastActivedTime =  new Date();

    if (datactx.onlineUsers.add(user))
        res.json({ user_token: user.id });
    else
        res.status(400).send('User Login fail.');
});

module.exports = router;

function checkPassword(username, password) {
    return true;
}

function checkRepeatLogin(username){
    for (i = 0; i < datactx.onlineUsers.length; i++) {
        if (username === datactx.onlineUsers[i].name) {
            return false;
        }
    }
    return true;
}

function findUser(username){
    for (i = 0; i < datactx.users.length; i++) {
        if (username === datactx.users[i].name) {
            return datactx.users[i];
        }
    }
    return null;
}