var express = require('express');
var datactx = require('../data/datacontext')
var router = express.Router();

/* GET login. */
router.get('/', function (req, res) {
    
    //for debug mock
    req.username = 'admin';
    req.password = '123456';

    if (!checkUser(req.username, req.password)){
        res.status(403).send('Access Denied.');
        return;
    }
    
    if (!checkRepeatLogin(req.username)) {
        res.status(400).send('User has already logged in.');
    }
    
    var user = findUser(req.username);
    
    if (user != null) {
        user.lastActivedTime =  new Date();
    } else {
        res.status(400).send('User has not registed.');
    }

    //var user = new User(req.username, req.password);
    //user.lastActivedTime = Date.now();
    
    if (datactx.onlineUsers.add(user))
        res.json({ user_token: user.id });
    else
        res.status(400).send('User Login fail.');
});

module.exports = router;

function checkUser(username, password) {
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