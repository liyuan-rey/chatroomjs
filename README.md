# chatroomjs
A demo chatroom application that using nodejs, expressjs, socket.io(websocket), angularjs, twitter bootstrap and more.

![chatroom ui](./doc/chatroom.png)

## Tools selection while develop this demo

### source control - svn vs git
svn - [http://subversion.apache.org/](http://subversion.apache.org/)

git - [http://git-scm.com/](http://git-scm.com/)


### package manager - npm vs Bower
Nick Heiner has described his reason 
[here](https://medium.com/@nickheiner/why-my-team-uses-npm-instead-of-bower-eecfe1b9afcb).

For me, all things that Bower can do, npm can do either. 
As npm more widely used in the field of package manager, my choice is npm.

npm - [https://www.npmjs.com/](https://www.npmjs.com/)

Bower - [http://bower.io/](http://bower.io/) 


### task runner - grunt vs gulp vs Broccoli
Broccoli has some interesting ideas, but not production-ready, need more development.

grunt vs gulp? no winner. There are many article compared the two great tools. 

[http://sixrevisions.com/web-development/grunt-vs-gulp/](http://sixrevisions.com/web-development/grunt-vs-gulp/), 

[https://medium.com/@preslavrachev/gulp-vs-grunt-why-one-why-the-other-f5d3b398edc4](https://medium.com/@preslavrachev/gulp-vs-grunt-why-one-why-the-other-f5d3b398edc4),
 
[http://www.hongkiat.com/blog/gulp-vs-grunt/](http://www.hongkiat.com/blog/gulp-vs-grunt/), 

[http://jaysoo.ca/2014/01/27/gruntjs-vs-gulpjs/](http://jaysoo.ca/2014/01/27/gruntjs-vs-gulpjs/).

In my opinion, gulp is a good start for new project. 

grunt - [http://gruntjs.com/](http://gruntjs.com/)

gulp - [http://gulpjs.com/](http://gulpjs.com/)

Broccoli - [https://github.com/broccolijs/broccoli](https://github.com/broccolijs/broccoli)


### code generator - Yeoman vs ember-cli
ember-cli is deeply sticked with EmberJS, seems not a widly suitable tool.

So Yeoman is the chosen one.

Yeoman - [http://yeoman.io/](http://yeoman.io/)

ember-cli - [http://www.ember-cli.com/](http://www.ember-cli.com/)


### javascript/modularity patten - CommonJS vs AMD vs TypeScript vs ES2015 modules(with Babel)
As a reference, requirejs has a article describ why they prefer AMD than CommonJS on web page:
 [http://www.requirejs.org/docs/whyamd.html](http://www.requirejs.org/docs/whyamd.html)

It is more wisely that use appropriate patten in different environment, use AMD in current web browser, follow CommonJS in NodeJS,
 and migrate to ES2015 if any possible.
 
CommonJS - [http://wiki.commonjs.org/wiki/CommonJS](http://wiki.commonjs.org/wiki/CommonJS)

AMD - [https://github.com/amdjs/amdjs-api/](https://github.com/amdjs/amdjs-api/)

TypeScript - [http://www.typescriptlang.org/](http://www.typescriptlang.org/)

Babel - [https://babeljs.io/](https://babeljs.io/)


### module bundler - browserify vs webpack
webpack has a valuable article which describ the difference between some major competition tools, please check:
 [http://webpack.github.io/docs/comparison.html](http://webpack.github.io/docs/comparison.html)

My choice is webpack.

browserify - [http://browserify.org/](http://browserify.org/)

webpack - [http://webpack.github.io/](http://webpack.github.io/)


### minimizing - UglifyJS vs Closure Compiler
Here is a compare from Uglify, [http://lisperator.net/blog/should-you-switch-to-uglifyjs2/](http://lisperator.net/blog/should-you-switch-to-uglifyjs2/)

My choice is UglifyJS.

UglifyJS - [http://lisperator.net/uglifyjs/](http://lisperator.net/uglifyjs/), and already included in webpack

Closure Compiler - [https://github.com/google/closure-compiler](https://github.com/google/closure-compiler)


### develop http server - http-server vs webpack-dev-server
http-server - [https://github.com/indexzero/http-server](https://github.com/indexzero/http-server)

webpack-dev-server - [http://webpack.github.io/docs/webpack-dev-server.html](http://webpack.github.io/docs/webpack-dev-server.html)


### unit test - Mocha vs Karma vs Intern
Mocha is a widely used javascript test framework.
Karma seems not a test 'FRAMEWORK', but a test 'RUNNER' which can intergrated with many test framework like Mocha, [Jasmine](http://jasmine.github.io/).
Intern has both 'framework' and 'runner' features. Intern's [home page](https://theintern.github.io/) has a comparison shows differences between various javascript test technologies including Mocha and Karma.

My choice is Intern.

Mocha - [http://mochajs.org/](http://mochajs.org/)

Karma - [http://karma-runner.github.io/](http://karma-runner.github.io/)

Intern - [https://theintern.github.io/](https://theintern.github.io/)


### code quality - ESLint vs JSHint vs JSLint vs JSCS
Jani Hartikainen wrote a nice article 
[here](http://www.sitepoint.com/comparison-javascript-linting-tools/).

My choice is ESLint.

ESLint - [http://eslint.org/](http://eslint.org/)

JSHint - [http://www.jshint.com/](http://www.jshint.com/)

JSLint - [http://jslint.com/](http://jslint.com/)

JSCS - [http://jscs.info/](http://jscs.info/)


### ui framework - AngularJS vs React
AngularJS is more regular to me, I'm not get used to React since it's JSX style.

AngularJS - [https://angularjs.org/](https://angularjs.org/)

React - [http://facebook.github.io/react/](http://facebook.github.io/react/)


### ui component - Twitter Bootstrap
Twitter Bootstrap - [http://getbootstrap.com/](http://getbootstrap.com/)


### css pre-processor - sass(scss) vs less
sass - [http://sass-lang.com/](http://sass-lang.com/)

less - [http://www.lesscss.org/](http://www.lesscss.org/)


### production server - Express & Socket.IO
Express - [http://expressjs.com/](http://expressjs.com/)

Socket.IO - [http://socket.io/](http://socket.io/)


### database - MongoDB vs Redis vs ?
MongoDB - [http://www.mongodb.org/](http://www.mongodb.org/)

Redis - [http://redis.io/](http://redis.io/)


### utility libraries - underscore vs lodash
Both library is briliant and have more than 70% same feature with closly performence.
These two libs will merge in future, see: [https://github.com/jashkenas/underscore/issues/2182](https://github.com/jashkenas/underscore/issues/2182)

For this moment i perfer lodash more, cause it's concise api style.

http://stackoverflow.com/questions/13789618/differences-between-lodash-and-underscore

https://lodash.com/benchmarks

http://jsperf.com/lodash-underscore/13

underscore - [http://underscorejs.org/](http://underscorejs.org/)

lodash - [https://lodash.com/](https://lodash.com/)


### HyperApp - Electron(atom-shell) vs NW.js(node-webkit) vs Apache Cordova vs PhoneCap
Electron and NW.js is for desktop application, Cordova and PhoneCap prefer mobile app.

In desktop, I choice Electron. In mobile, especially phone environment, I choice Apache Cordova.

Electron - [http://electron.atom.io/](http://electron.atom.io/)

NW.js - [http://nwjs.io/](http://nwjs.io/)

Apache Cordova - [http://cordova.apache.org/](http://cordova.apache.org/)

PhoneCap- [http://phonegap.com/](http://phonegap.com/)


### other libraries
Passport - http://passportjs.org/
Passport is authentication middleware for Node.



```
to be continue...
```