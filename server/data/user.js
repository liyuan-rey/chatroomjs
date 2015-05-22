// user.js

var uuid = require('node-uuid');

function User(name, password) {
    this.id = uuid.v4();
    this.name = '';
    this.password = '';
    this.lastActivedTime = new Date('1970-01-01T00:00:00.000Z');
};


module.exports = User;
