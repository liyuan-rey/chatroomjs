// app.js

requirejs.config({
    baseUrl: 'js',
    shim: {

    },
    paths: {
        jquery: 'vendor/jquery'
    },
    packages: [

    ]
});

require(['require', 'jquery'], function(require, $) {
    'use strict';

    $('log').text('running in app.js\n');

    require(['jquery', 'auth/login'], function($, login) {
        $('testbtn').click = login.onTest;
    });

});

