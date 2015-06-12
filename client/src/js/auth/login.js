// login.js

define(['require', 'jquery'], function (require, $) {
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