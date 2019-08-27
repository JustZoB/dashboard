var gulp = require('gulp'),
    watch = require('gulp-watch'),
    server = require('gulp-server-livereload');

gulp.task('default', function() {
  gulp.src('')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      directoryListing: false,
      open: false
    }));
});

gulp.task('stream', function () {
  return watch('css/*.css', { ignoreInitial: false })
      .pipe(gulp.dest('build'));
});

gulp.task('callback', function () {
  return watch('css/*.css', function () {
      gulp.src('css/*.css')
          .pipe(gulp.dest('build'));
  });
});
