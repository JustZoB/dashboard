var gulp = require('gulp'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    del = require('del'),
    gulpsync = require('gulp-sync')(gulp);

gulp.task('clean', function() {
  return del([ './build' ]);
})

gulp.task('html', function() {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./build/'))
    .pipe(connect.reload());
})

gulp.task('js', function() {
  return gulp.src('src/js/*.js')
    .pipe(gulp.dest('build/js'))
    .pipe(connect.reload());
})

gulp.task('scss', function() {
  return gulp.src('src/style/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/style'))
    .pipe(connect.reload());
})

gulp.task('build', function() {
  gulp.src('./src/fonts/**/*.*')
    .pipe(gulp.dest('./build/fonts/'));
  gulp.src('./src/img/*.*')
    .pipe(gulp.dest('./build/img/'));
  gulp.src('./src/**/normalize.css')
    .pipe(gulp.dest('./build/'));
})

gulp.task('connected', function() {
  connect.server({
    name: 'dashboard',
    root: 'build',
    port: 8080,
    livereload: true
  });
})

gulp.task('watcher', function() {
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/style/**/*.scss', ['scss'])
})

let develop = ['clean', 'build', 'html', 'js', 'scss', 'connected', 'watcher'];
let production = ['clean', 'build'];

gulp.task('dev', gulpsync.sync(develop));
gulp.task('prod', gulpsync.sync(production)); 
