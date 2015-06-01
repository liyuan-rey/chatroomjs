var gulp = require('gulp');

// Automatically load any gulp plugins in package.json
var plugins = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for
    config: './package.json', // where to find the plugins, by default  searched up from process.cwd()
    scope: ['dependencies', 'devDependencies'], // which keys in the config to look within
    replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
    camelize: true, // if true, transforms hyphenated plugins names to camel case
    lazy: true, // whether the plugins should be lazy loaded on demand
    rename: {
        'gulp-ruby-sass': 'sass'
    } // a mapping of plugins to rename
});

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

var pkg = require('./package.json');

var buildConfig = require('./build.config.js');

/*
 * Helper tasks
 */

gulp.task('config', function() {
    dirs.target = dirs.build;
});

gulp.task('copy', [
    'copy:vendor',
    'copy:app_html',
    'copy:app_js'
]);

gulp.task('copy:vendor', function () {
    return gulp.src(buildConfig.vendor_files.js)
        .pipe(gulp.dest(buildConfig.build_dir + '/js/vendor'));
});

gulp.task('copy:app_html', function () {
    return gulp.src(buildConfig.app_files.html)
        .pipe(gulp.dest(buildConfig.build_dir + '/'));
});

gulp.task('copy:app_js', function () {
    return gulp.src(buildConfig.app_files.js)
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