var gulp = require('gulp');

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

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

var pkg = require('./package.json');

var buildConfig = require('./build.config.js');

/*
 * Helper tasks
 */

gulp.task('config', function() {
});

gulp.task('copy', function(callback) {
    runSequence(['copy:vendor', 'copy:app_js'], 'copy:app_html', callback);
});

gulp.task('copy:vendor', function(callback) {
    gulp.src(buildConfig.vendor_files.requirejs)
        .pipe(plugins.if(buildConfig.debug, plugins.filter(['*', '!**/*.map'])))
        //.pipe(plugins.if(buildConfig.debug, plugins.ignore.exclude('*/*.map')))
        .pipe(gulp.dest(buildConfig.build_dir + '/vendor/requirejs'));

    gulp.src(buildConfig.vendor_files.jquery)
        .pipe(plugins.if(buildConfig.debug, plugins.filter(['*', '!**/*.map'])))
        .pipe(gulp.dest(buildConfig.build_dir + '/vendor/jquery'));

    gulp.src(buildConfig.vendor_files.bootstrap)
        .pipe(plugins.if(buildConfig.debug, plugins.filter(['**/*', '!**/*.map'])))
        .pipe(gulp.dest(buildConfig.build_dir + '/vendor/bootstrap'));

    callback();
});

var series = require('stream-series');
gulp.task('copy:app_html', function () {
    var csssrc = gulp.src([buildConfig.build_dir + '/vendor/bootstrap/css/*.css'], { read: false });
    var vendorjssrc = gulp.src([
        buildConfig.build_dir + '/vendor/jquery/*.js',
        buildConfig.build_dir + '/vendor/bootstrap/js/*.js',
        buildConfig.build_dir + '/vendor/requirejs/*.js'
    ], { read: false });
    var appjssrc = gulp.src([
        buildConfig.build_dir + '/js/app.js'
    ], { read: false });

    return gulp.src(buildConfig.app_files.html)
        .pipe(plugins.inject(csssrc, { relative: true, starttag: '<!-- inject:css -->' }))
        .pipe(plugins.inject(series(vendorjssrc, appjssrc), { relative: true, starttag: '<!-- inject:js -->' }))
        .pipe(gulp.dest(buildConfig.build_dir + '/'));
});

gulp.task('copy:app_js', function () {
    return gulp.src(buildConfig.app_files.js)
        //.pipe(plugins.concat('app.js'))
        //.pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(buildConfig.build_dir + '/'));
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

gulp.task('clean', function(callback) {
    require('del')([
        buildConfig.build_dir,
        buildConfig.dist_dir
    ], callback);
});

gulp.task('build', function(callback) {
    runSequence(
        ['clean'],
        'copy',
        callback);
});

gulp.task('install-package', function(callback) {
    callback();
});