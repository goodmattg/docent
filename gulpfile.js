var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var resolutions = require('browserify-resolutions');
var eslint = require('gulp-eslint');
var path = require('path');
var livereload = require('gulp-livereload');


gulp.task('browserify', function () {
  livereload.listen();
  var bundler = browserify({
    entries: ['./public/main.jsx'], // bundle the main.jsx file
    paths: ['./node_modules','./public'], // bundle modules and other files
    transform: [reactify],
    debug: true,
    // Required properties for watchify
    cache: {}, packageCache: {}, fullPaths: true
  }).plugin(resolutions, '*')
    .on('time', function (time) {
      console.log('Bundle updated in ' + (time / 1000) + 's.');
    });

  var watcher = watchify(bundler);

  var bundle = function () {
    watcher
      .bundle()
      .on('error', function (err) {
        console.log(err.toString());
      })
      .pipe(source('main.js'))
      .pipe(gulp.dest('./public/build/'))
      .pipe(livereload());
  };

  bundle();

  return watcher.on('update', function (filenames) {
    filenames.forEach(function (filename) {
      // List the file that was changed
      console.log(path.relative(__dirname, filename) + ' changed.');
    });
    bundle();
  });
});

gulp.task('default', ['browserify']);

var JS = [
  'public/**/*.jsx',
  'public/actions/*.js',
  'public/reducer/*.js',
  'public/main.jsx'
];

gulp.task('eslint', function () {
  return gulp.src(JS)
    .pipe(eslint())
    .pipe(eslint.format());
});
