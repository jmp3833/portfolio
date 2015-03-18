'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var reactify = require('reactify');
var connect = require('gulp-connect');
var exec = require('child_process').exec;
var babelify = require('babelify');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var bundler = watchify(browserify('./player/src/js/app.js', watchify.args));

// Browserify transforms to accept React JSX components
bundler.transform(reactify).on('error', restart);
bundler.transform(babelify).on('error', restart);
bundler.transform('brfs').on('error', restart);
bundler.on('log', function(message) {
  console.log('Change detected. Re-bundle completed: ' + message);
});

//Package all browserify code into JavaScript bundle
function bundle() {
  return bundler
    .bundle()
    .on('error', restart)
    .pipe(source('bundle.js'))
    .on('error', restart)
    .pipe(buffer())
    .on('error', restart)
    .pipe(uglify())
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
    .on('error', restart)
    .pipe(sourcemaps.write('./')) // writes .map file
    .on('error', restart)
    .on('error', restart)
    .pipe(gulp.dest('player/dist'));
}

function lessToCss() {
  return gulp.src('player/less/app.less')
    .pipe(sourcemaps.init())
    .on('error', restart)
    .pipe(less({
        paths: ['less']
    }))
    .on('error', restart)
    .pipe(sourcemaps.write('./'))
    .on('error', restart)
    .pipe(minifyCSS({keepBreaks: true}))
    .pipe(gulp.dest('player/dist'));
}

//deploy simple webserver
function server(){
  connect.server({
    port: 9500,
    livereload: {
      livereload: true,
      port: 35730
    }
  });
}

function restart(error) {
  delete error.stream;
  console.log(error);
  this.emit('end');
}

gulp.task('js', bundle);
gulp.task('less', lessToCss);
gulp.task('serve', ['less', 'js'], server);
gulp.task('default', ['serve']);

gulp.watch('./player/less/**/*.less', ['less']);
gulp.watch('./player/src/**/*.js', ['js']);
