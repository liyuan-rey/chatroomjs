var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

var pkg = require('./package.json');

var buildConfig = require( './build.config.js' );

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

gulp.task('clean', function(cb) {
    require('del')([
        buildConfig.build_dir,
        buildConfig.dist_dir
    ], cb);
});

gulp.task('build', function(cb) {
    runSequence(
        ['clean'],
        'copy',
        cb);
});