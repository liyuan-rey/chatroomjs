// app.js
// since app.js is the entry point of the js web application, app.js is not defined as a amd module.

requirejs.config({
    baseUrl: './js/',
    paths: {
        jquery: '../vendor/jquery/jquery.min',
        bootstrap: '../vendor/bootstrap/js/bootstrap.min',
        lodash: '../vendor/lodash/index'
    },
    shim: {
        // Since Bootstrap 3, all code is executed in closures and added to jQuery as a plugin.
        // There is nothing to export, so you have to put bootstrap to the last dependency.
        // Use below style, requirejs return a value, so we can put bootstrap to any position of
        // dependencies, and make the code more clearly. See more:
        //   http://getfishtank.ca/blog/how-to-use-bootstrap-3-with-requirejs
        //   http://getfishtank.ca/blog/load-bootstrap-3-javascript-components-using-requirejs
        //
        // 'bootstrap/bootstrap-popover': { deps: ['jquery'], exports: '$.fn.popover' }
    }
});

require(['require', 'jquery', 'lodash', 'bootstrap'], function (require, $, _) {
    'use strict';

    //$('log').text('running in app.js\n');
    //$(form).trigger('submit', [true]);

    // dom ready
    $(function () {

        require(['./auth/login.min'], function (login) {

            // do login
            $('#login-editor').on('submit', function (e) {
                e.preventDefault();

                $('#login-editor').hide();

                var bar = $('.progress .progress-bar');
                bar.addClass('active');
                $('#login-progress').show();

                //
                var user = $('#user').val();
                var pwd = $('#pwd').val();
                login.login(user, pwd);

                var timer = setTimeout(function () {
                    $('#login-progress').hide();
                    bar.removeClass('active');
                    $('#logout-editor').show();

                    clearInterval(timer);
                    timer = null;
                }, 1000);
            });

            // do logout
            $('#logout-editor').on('submit', function (e) {
                e.preventDefault();

                login.logout();
                $('#logout-editor').hide();
                $('#login-editor').show();
            });

            // do chat
            $('#msg-editor').on('submit', function (e) {
                e.preventDefault();

                $('#submitMsg')[0].disabled = true;
                setTimeout(function () {
                    $('#submitMsg')[0].disabled = false;
                }, 1500);

                var tmpl = $('#chat-list .popover').last();
                var inst = tmpl.clone(true);
                var chatlist = $('#chat-list');
                chatlist.append(inst);
                chatlist.animate({scrollTop: chatlist.scrollTop() + inst.offset().top}, 1000);
            });

        });
    });
});

