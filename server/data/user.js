// user.js

var uuid = require('node-uuid');

function User(name, password) {
    this.id = uuid.v4();
    this.name = name;
    this.password = password;
    this.lastActivedTime = new Date(0);
};


module.exports = User;
