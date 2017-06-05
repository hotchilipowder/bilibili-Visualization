var gulp = require('gulp');

gulp.task('default', function() {
  gulp.src("./src/assets/**")
    .pipe(gulp.dest('./public/assets'));

});