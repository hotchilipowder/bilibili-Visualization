var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.task('default', function() {
  gulp.src("./src/assets/**")
    .pipe(gulp.dest('./public/assets'));
});

gulp.task('build', function(){
  gulp.src("./build/**")
    .pipe(gulp.dest('./gh-pages'));

  gulp.src("./build/static/js/*.js")
    .pipe(rename(function(path){
        path.dirname = ".";
        path.basename = 'bundle';
        path.extname = ".js";
        console.log(path)
      }))
      .pipe(gulp.dest('./gh-pages'));
})