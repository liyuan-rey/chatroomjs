// datacontext.js

var DataSet = require('./dataset');

function DataContext() {
    if (typeof (this.onlineUsers) != 'DataSet')
        DataContext.prototype.onlineUsers = new DataSet();
};


module.exports = new DataContext();
