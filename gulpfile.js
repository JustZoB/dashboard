var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require("browser-sync"),
    del = require('del'),
    watch = require('gulp-watch'),
    reload = browserSync.reload;

var config = {
  server: {
      baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 8000
};

function clean() {
  return del([ './build' ]);
}

function build() {
  gulp.src('./src/**/*.*')
    .pipe(gulp.dest('./build/'));
  return gulp.src('src/style/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css/'))
    .pipe(reload({stream: true}));
}

function watcher() {
  return watch(['src/style/**/*.scss'], function(event, cb) {
    gulp.start('build');
  });
}

function server() {
  return browserSync(config);
}

let develop = gulp.series(clean, build, server, watcher);
let production = gulp.series(clean, build);

gulp.task('dev', develop);
gulp.task('prod', production); 
