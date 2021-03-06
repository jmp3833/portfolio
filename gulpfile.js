'use strict';

var gulp        = require('gulp'),
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    watchify    = require('watchify'),
    babelify    = require('babelify'),
    reactify    = require('reactify'),
    buffer      = require('vinyl-buffer'),
    sourcemaps  = require('gulp-sourcemaps'),
    nodemon     = require('gulp-nodemon'),
    less        = require('gulp-less');

function restart(error) {
  delete error.stream;
  console.log(error);
  this.emit('end');
}

function bundleJS(b) {
  b.bundle()
    .on('error', restart)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./player/dist'))
}

gulp.task('js', function() {
  var b = browserify('./player/src/js/app.js', watchify.args);
  
  b.transform(reactify);
  b.transform(babelify);
  b.transform('brfs');  

  b.on('log', console.log);
  b.on('update', function(){
    process.stdout.write('Change detected: JS. Rebundling: ');
    bundleJS(b);
  });

  bundleJS(b);
});

gulp.task('js-watch', function() {
  var b = watchify(browserify('./player/src/js/app.js', watchify.args));
  
  b.transform(reactify);
  b.transform(babelify);
  b.transform('brfs');

  b.on('log', console.log);
  b.on('update', function(){
    process.stdout.write('Change detected: JS. Rebundling: ');
    bundleJS(b);
  });

  bundleJS(b);
});

gulp.task('index', function() {
  gulp.src('./index.html')
    .pipe(gulp.dest('./player/dist'));
});

gulp.task('less', function() {
  gulp.src('./player/less/app.less')
    .pipe(sourcemaps.init())
    .pipe(less({
        paths: ['player/less']
    }))
    .on('error', restart)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./player/dist'));
});

gulp.task('serve', function(){
  nodemon({'script': './bin/www'});
});

function restart(error) {
  delete error.stream;
  console.log(error);
  this.emit('end');
}

gulp.task('build', ['index', 'js', 'less']);

gulp.task('default', ['index', 'js-watch', 'less', 'serve'], function(){
  gulp.watch('./player/less/**', ['less'], function() {
    console.log('Change detected: Styles. Reload!');
  });

  gulp.watch('./index.html', ['index'], function() {
    console.log('Change detected: HTML. Reload!');
  });
});
