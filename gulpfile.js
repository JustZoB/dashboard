var gulp = require('gulp');
var server = require('gulp-server-livereload');
 
gulp.task('default', function() {
  gulp.src('')
    .pipe(server({
      livereload: true,
      defaultFile: 'index.html',
      directoryListing: false,
      open: false
    }));
});
