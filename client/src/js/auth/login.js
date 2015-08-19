// login.js

define(['require', 'jquery', 'socket.io-client'], function (require, $, io) {
    'use strict';

    var login = {};

    login.LOGED_IN = 'Logged In';
    login.LOGED_OUT = 'Logged Out';
    login.LOGINING = 'Logining';

    login.status = login.LOGED_OUT;
    login.onStatusChanged = function (status) {
    };

    login.init = function () {
    };

    login.login = function (user, pwd) {
        debug.break();
        var socket = io('http://localhost:3000');
        socket.on('connect', function (data) {
            var tmp = data;
        });

        this.status = login.LOGED_IN;
        return true;

        $.post("http://localhost:3000/login/",
            {username: user, password: pwd},
            function (data) {
                if (data == "ko") {
                    alert('bad password');
                } else {
                    $(selfForm).trigger('submit', [true]); // again submit but with ok parameter
                }
        });
    };

    login.logout = function () {
        this.status = login.LOGED_OUT;
    };

    return login;
});