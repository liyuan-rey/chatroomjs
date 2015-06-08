var gulp = require('gulp');
var gutil = require('gulp-util');

// Automatically load any gulp plugins in package.json
var plugins = require('gulp-load-plugins')();
//var plugins = require('gulp-load-plugins')({
//    pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for
//    config: './package.json', // where to find the plugins, by default  searched up from process.cwd()
//    scope: ['dependencies', 'devDependencies'], // which keys in the config to look within
//    replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
//    camelize: true, // if true, transforms hyphenated plugins names to camel case
//    lazy: false, // whether the plugins should be lazy loaded on demand
//    rename: {
//        'gulp-ruby-sass': 'sass'
//    } // a mapping of plugins to rename
//});

var es = require('event-stream');
var series = require('stream-series');

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence').use(gulp);


var buildConfig = require('./build.config.js');

/*
 * Helper tasks
 */

//gulp.task('copy', function(callback) {
//    runSequence('copy:vendor', 'copy:app_js', 'copy:app_html', callback);
//});

gulp.task('copy', ['copy:vendor', 'copy:app_js', 'copy:app_html']);

gulp.task('copy:vendor', function() {
    return es.merge(
        gulp.src(buildConfig.vendor_files.requirejs)
            .pipe(buildConfig.debug ? gutil.noop() : plugins.filter(['*', '!**/*.map']))
            //.pipe(plugins.if(buildConfig.debug, plugins.ignore.exclude('*/*.map')))
            .pipe(gulp.dest(buildConfig.build_dir + '/vendor/requirejs')),

        gulp.src(buildConfig.vendor_files.jquery)
            .pipe(buildConfig.debug ? gutil.noop() : plugins.filter(['*', '!**/*.map']))
            .pipe(gulp.dest(buildConfig.build_dir + '/vendor/jquery')),

        gulp.src(buildConfig.vendor_files.bootstrap)
            .pipe(buildConfig.debug ? gutil.noop() : plugins.filter(['**/*', '!**/*.map']))
            .pipe(gulp.dest(buildConfig.build_dir + '/vendor/bootstrap'))
    );

});

gulp.task('copy:app_html', function () {
    return gulp.src(buildConfig.app_files.html)
        .pipe(gulp.dest(buildConfig.build_dir + '/'));
});

gulp.task('copy:app_js', function () {
    return gulp.src(buildConfig.app_files.js)
        //.pipe(plugins.concat('app.js'))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(buildConfig.build_dir + '/'));
});

gulp.task('inject', ['wait'], function() {
    var csssrc = gulp.src([buildConfig.build_dir + '/vendor/bootstrap/**/css/*.css'], { read: false });
        //.pipe(plugins.debug({ title: 'gulp-debug:', minimal: false}));
    var vendorjssrc = gulp.src([
        buildConfig.build_dir + '/vendor/jquery/*.js',
        buildConfig.build_dir + '/vendor/bootstrap/js/*.js',
        buildConfig.build_dir + '/vendor/requirejs/*.js'
    ], { read: false });
    var appjssrc = gulp.src([
        buildConfig.build_dir + '/js/*.js'
    ], { read: false });

    return gulp.src(buildConfig.build_dir + '/' + 'index.html')
        .pipe(plugins.inject(csssrc, { relative: true, starttag: '<!-- inject:css -->' }))
        .pipe(plugins.inject(series(vendorjssrc, appjssrc), { relative: true, starttag: '<!-- inject:js -->' }))
        .pipe(gulp.dest(buildConfig.build_dir + '/'));
});

gulp.task('wait', function (callback) { // wait 1 second, work around for delay of file copy/flush on win7
    var t = setTimeout(function () {
        clearTimeout(t);
        t = null;
        callback();
    }, 1000);
});
//gulp.task('copy:jquery', function () {
//    return gulp.src(['vendor/jquery/dist/jquery.min.js'])
//        .pipe(plugins.rename('jquery-' + pkg.dependencies.jquery + '.min.js'))
//        .pipe(gulp.dest(dirs.dist + '/js/vendor'));
//});

/*
 * Main tasks
 */

gulp.task('default', ['build']);

gulp.task('build', function(callback) {
    var mode = buildConfig.debug ? "DEBUG" : "RELEASE";
    gutil.log('--- build in ' + mode + ' mode ---');

    runSequence('clean', 'copy', 'inject', callback);
});

gulp.task('clean', function(callback) {
    require('del')([
        buildConfig.build_dir,
        buildConfig.dist_dir
    ], callback);
});

gulp.task('bump-version', function () {
//Note: I have hardcoded the version change type to 'patch' but it may be a good idea to use
//      minimist (https://www.npmjs.com/package/minimist) to determine with a command argument whether you are doing
//      a 'major', 'minor' or a 'patch' change.
    return gulp.src(['./package.json'])
        .pipe(plugins.bump({type: "patch"}).on('error', gutil.log))
        .pipe(gulp.dest('./'));
});

var mainBowerFiles = require('main-bower-files');
gulp.task('prepare-build-config', ['clean'], function() {
    //var base = process.cwd();
    //var pkgFile = './package.json';
    //var moduleDir = './node_modules/';
    //
    //var pkg = require(pkgFile);
    //for (var p in pkg.dependencies) {
    //    gutil.log(p.toString());
    //}
    //
    //callback();

    return gulp.src(
        mainBowerFiles({
            paths: {
                bowerDirectory: './node_modules',
                bowerrc: '',//'./.bowerrc',
                bowerJson: './package.json'
            },
            overrides: {
                requirejs: {
                    main: 'require.js'
                },
                bootstrap: {
                    main: 'dist/**/*.*'
                }
            }
            ,filter: ['**', '!**/npm.js']
            ,checkExistence: true
            ,debugging: true
        }),
        {
            base: './node_modules'
        })
        .pipe(gulp.dest('./build/vendor'))
        .pipe(plugins.debug({ title: 'gulp-debug:', minimal: false}));
});