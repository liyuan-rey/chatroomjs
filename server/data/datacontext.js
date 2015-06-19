// datacontext.js

var DataSet = require('../common/dataset');
var User = require('./user');

function DataContext() {
    if (typeof (this.onlineUsers) != 'DataSet') { //prototyping only once
        DataContext.prototype.onlineUsers = new DataSet();
        DataContext.prototype.users = new DataSet();

        seed(this);
    }
}

function seed(datactx) {
    var user = new User('admin', '123456');//Authorization: Basic YWRtaW46MTIzNDU2
    datactx.users.add(user);
}

module.exports = new DataContext();
