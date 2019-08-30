var gulp = require('gulp'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    del = require('del'),
    gulpsync = require('gulp-sync')(gulp);

gulp.task('clean', () => {
  return del([ './build' ]);
})

gulp.task('html', () => {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./build/'))
    .pipe(connect.reload());
})

gulp.task('js', () => {
  return gulp.src('src/js/*.js')
    .pipe(gulp.dest('build/js'))
    .pipe(connect.reload());
})

gulp.task('scss', () => {
  return gulp.src('src/style/style.scss')
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/style'))
    .pipe(connect.reload());
})

gulp.task('build', () => {
  gulp.src('./src/fonts/**/*.*')
    .pipe(gulp.dest('./build/fonts/'));
  gulp.src('./src/img/*.*')
    .pipe(gulp.dest('./build/img/'));
  gulp.src('./src/**/normalize.css')
    .pipe(gulp.dest('./build/'));
})

gulp.task('connected', () => {
  connect.server({
    name: 'dashboard',
    root: 'build',
    port: 8040,
    livereload: true
  });
})

gulp.task('watcher', () => {
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/style/**/*.scss', ['scss'])
})

let develop = ['clean', 'build', 'html', 'js', 'scss', 'connected', 'watcher'];
let production = ['clean', 'build'];

gulp.task('dev', gulpsync.sync(develop));
gulp.task('prod', gulpsync.sync(production)); 
