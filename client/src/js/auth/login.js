// login.js

define(['require', 'jquery'], function(require, $) {
    'use strict';

    var log = $('log');
    log.textContent += 'loading login.js\n';

    var obj = {};
    obj.onTest = function (data, fn) {
        var user = $('username').value;
        var pwd = $('password').value;

        var log = $('log');
        log.textContent += user + ':' + pwd + '\n';
    };

    return obj;
});