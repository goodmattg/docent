var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var resolutions = require('browserify-resolutions');
var eslint = require('gulp-eslint');
var path = require('path');
var livereload = require('gulp-livereload');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');

/* Need to bundle the main.jsx file using browserify with reactify transform.
Only then load the browsersync server and have it build the index.html page.
Have a watcher on the bundle and reload the page every time it changes.

*/
var JS = [
  'public/**/*.jsx',
  'public/actions/*.js',
  'public/reducer/*.js',
  'public/main.jsx',
  'public/helpers/*.js',
  'public/initialCondition/*.js',
  'middlewares/**/*.js',
  'db/**/*.js'
];

var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', ['bundle'], function (cb) {
  var called = false;
  return nodemon({

    // nodemon the ExpressJs server
    script: 'app.js',

    // watch core server file(s) that require server restart on change
    watch: ['app.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
  });

// Browserify bundler
var bundler = browserify({
  entries: ['./public/main.jsx'], // bundle the main.jsx file
  paths: ['./node_modules','./public'], // paths to files bundle may require
  transform: [reactify],
  debug: true,
  // Required properties for watchify
  cache: {}, packageCache: {}, fullPaths: true
}).plugin(resolutions, '*')
  .on('time', function (time) {
    console.log('Bundle updated in ' + (time / 1000) + 's.');
  });

// Watcher on the bundle

gulp.task('bundle', ['sass'], function () {
  bundler.bundle()
  .on('error', function (err) {
    console.log(err.toString());
  })
  .pipe(source('main.js'))
  .pipe(gulp.dest('./public/build/'));
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init({
    proxy: 'http://localhost:3000',
    port: 4000,
    browser: ['google-chrome']
  });
});

gulp.task('refresh', ['bundle'], function () {
  browserSync.reload();
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(JS, ['refresh']);
    gulp.watch('public/styles/sass/*.scss', ['sass']);
});

// ---------- Extra tasks ------------- //

// Linting task
gulp.task('eslint', function () {
  return gulp.src(JS)
    .pipe(eslint())
    .pipe(eslint.format());
});

// Converts sass to css
gulp.task('sass', function () {
  return gulp.src('public/styles/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/styles/css'))
    .pipe(browserSync.reload({ stream: true }));
});



