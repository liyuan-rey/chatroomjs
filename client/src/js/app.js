// app.js
// since app.js is the entry point of the js web application, app.js is not defined as a amd module.

requirejs.config({
    baseUrl: './',
    paths: {
        jquery: '../vendor/jquery/jquery.min.js',
        bootstrap: '../vendor/bootstrap/js/bootstrap.min.js'
    },
    shim: {
        'bootstrap/bootstrap-slider': { deps: ['jquery'], exports: '$.fn.slider' },
        'bootstrap/bootstrap-affix': { deps: ['jquery'], exports: '$.fn.affix' },
        'bootstrap/bootstrap-alert': { deps: ['jquery'], exports: '$.fn.alert' },
        'bootstrap/bootstrap-button': { deps: ['jquery'], exports: '$.fn.button' },
        'bootstrap/bootstrap-carousel': { deps: ['jquery'], exports: '$.fn.carousel' },
        'bootstrap/bootstrap-collapse': { deps: ['jquery'], exports: '$.fn.collapse' },
        'bootstrap/bootstrap-dropdown': { deps: ['jquery'], exports: '$.fn.dropdown' },
        'bootstrap/bootstrap-modal': { deps: ['jquery'], exports: '$.fn.modal' },
        'bootstrap/bootstrap-popover': { deps: ['jquery'], exports: '$.fn.popover' },
        'bootstrap/bootstrap-scrollspy': { deps: ['jquery'], exports: '$.fn.scrollspy'        },
        'bootstrap/bootstrap-tab': { deps: ['jquery'], exports: '$.fn.tab' },
        'bootstrap/bootstrap-tooltip': { deps: ['jquery'], exports: '$.fn.tooltip' },
        'bootstrap/bootstrap-transition': { deps: ['jquery'], exports: '$.support.transition' },
        'bootstrap/bootstrap-typeahead': { deps: ['jquery'], exports: '$.fn.typeahead'  }
    }
});

require(['require', 'jquery', './auth/login'], function(require, $, login) {
    'use strict';

    //$('log').text('running in app.js\n');

    $('document').one('ready', function (e) {
        alert('document is ready');

        $('testbtn').on('click', function (e) {
            e.preventDefault();
            alert('test btn clicked');
            login.onTest(e);
        })
    });


    //require(['jquery', './auth/login'], function($, login) {
    //    $('testbtn').click = login.onTest;
    //});

});

