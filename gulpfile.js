const gulp = require('gulp'),
    gulpsync = require('gulp-sync')(gulp),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    del = require('del'),

    cssmin = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),

    uglify = require('gulp-uglify'),
    pipeline = require('readable-stream').pipeline,
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    babelify = require('babelify');
    
const htmlMainFile = './src/index.html',
    scssMainFile = 'src/style/style.scss',
    jsMainFile = './src/js/main.js',

    htmlAllFiles = 'src/**/*.html',
    scssAllFiles = 'src/style/**/*.scss',
    jsAllFiles = 'src/js/**/*.js',
    
    scssDstDir = 'build/style',
    jsDstDir = './build/js/',
    jsBundleFile = 'bundle.min.js';

gulp.task('clean', () => {
  return del([ './build' ]);
})

gulp.task('html', () => {
  return gulp.src(htmlMainFile)
    .pipe(gulp.dest('./build/'))
    .pipe(connect.reload());
})

gulp.task('scss', () => {
  return gulp.src(scssMainFile)
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(scssDstDir))
    .pipe(connect.reload());
})

gulp.task('js', function() {
  return browserify({ entries: jsMainFile })
    .transform(babelify)
    .bundle()
    .on('error', function(err) {
      console.log(err.message);
      this.emit('end');
    })
    .pipe(source(jsBundleFile))
    .pipe(gulp.dest(jsDstDir))
    .pipe(connect.reload());
});

gulp.task('jsmin', ['js'], function () {
  return pipeline(
    gulp.src(jsDstDir + jsBundleFile),
    uglify(),
    gulp.dest(jsDstDir),
  );
});

gulp.task('build', ['html', 'scss', 'jsmin'], () => {
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
    livereload: true,
  });
})

gulp.task('watcher', () => {
  gulp.watch(htmlAllFiles, ['html']);
  gulp.watch(jsAllFiles, ['jsmin']);
  gulp.watch(scssAllFiles, ['scss'])
})

let develop = ['clean', 'build', 'connected', 'watcher'];
let production = ['clean', 'build'];

gulp.task('dev', gulpsync.sync(develop));
gulp.task('prod', gulpsync.sync(production));
