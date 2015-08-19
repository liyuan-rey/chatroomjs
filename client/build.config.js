module.exports = {

    debug: process.env.DEBUG ? true : false,

    vendor_dir: './node_modules',
    app_dir: './src',

    /**
     * The `build_dir` folder is where our projects are compiled during
     * development and the `dist_dir` folder is where our app resides once it's
     * completely built.
     */
    build_dir: './build',
    dist_dir: './dist',

    /**
     * This is the same as `app_files`, except it contains patterns that
     * reference vendor code (`vendor/`) that we need to place into the build
     * process somewhere. While the `app_files` property ensures all
     * standardized files are collected for compilation, it is the user's job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in `vendor_files.js`.
     *
     * The `vendor_files.js` property holds files to be automatically
     * concatenated and minified with our project source files.
     *
     * The `vendor_files.css` property holds any CSS files to be automatically
     * included in our app.
     *
     * The `vendor_files.assets` property holds any assets to be copied along
     * with our app's assets. This structure is flattened, so it is not
     * recommended that you use wildcards.
     */
    vendor_files: {
        requirejs: ['./node_modules/requirejs/**/require.js'],
        jquery: [
            './node_modules/jquery/dist/**/jquery.min.js',
            './node_modules/jquery/dist/**/jquery.min.map'],
        bootstrap: [
            './node_modules/bootstrap/dist/**/*.min.css',
            './node_modules/bootstrap/dist/**/*.min.js',
            './node_modules/bootstrap/dist/**/*.map',
            './node_modules/bootstrap/dist/**/fonts/*.*'],
        'socket.io-client': ['./node_modules/socket.io-client/**/socket.io.js'],
        lodash: ['./node_modules/lodash/**/index.js']
    },

    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `src/`). These file paths are used in the configuration of
     * build tasks. `js` is all project javascript, less tests. `ctpl` contains
     * our reusable components' (`src/common`) template HTML files, while
     * `atpl` contains the same, but for our app's code. `html` is just our
     * main HTML file, `less` is our main stylesheet, and `unit` contains our
     * app's unit tests.
     */
    app_files: {
        js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
        jsunit: [ 'src/**/*.spec.js' ],

        coffee: [ 'src/**/*.coffee', '!src/**/*.spec.coffee' ],
        coffeeunit: [ 'src/**/*.spec.coffee' ],

        atpl: [ 'src/app/**/*.tpl.html' ],
        ctpl: [ 'src/common/**/*.tpl.html' ],

        html: [ 'src/index.html' ],
        less: 'src/less/main.less'
    },

    /**
     * This is a collection of files used during testing only.
     */
    test_files: {
        js: [
            'vendor/angular-mocks/angular-mocks.js'
        ]
    }
};
