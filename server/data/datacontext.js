// datacontext.js

var DataSet = require('./dataset');
var User = require('./user');

function DataContext() {
    if (typeof (this.onlineUsers) != 'DataSet') {
        DataContext.prototype.onlineUsers = new DataSet();
        DataContext.prototype.users = new DataSet();
        
        var user = new User('admin', '123456');
        DataContext.prototype.users.add(user);
    }
};


module.exports = new DataContext();
