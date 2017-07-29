var gulp = require('gulp');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var clean = require('gulp-clean');
var watch = require('gulp-watch');
var path = require('path');

const public_dev_dir = "./src/public";
const public_dist_dir = "./public";

//gulp dev
gulp.task('public-watch', function() {
  return watch(path.resolve(public_dev_dir, "**"),function(){
      return gulp.src(path.resolve(public_dev_dir, "**"))
        .pipe(gulp.dest(public_dist_dir));
    });
});



//gulp build

gulp.task('build',[ 'build_addonvis'], function(){

  return gulp.src("../bilibili-vis-gh-pages/index.html")
    .pipe(replace(/http:\/\/127\.0\.0\.1:3000/g, 'https://h12345jack.github.io/bilibili-Visualization'))
    .pipe(rename(function(path){
      console.log(path);
    }))
    .pipe(gulp.dest("../bilibili-vis-gh-pages"))

})


gulp.task('build_addonvis',['rename_bundle'],function(){
    return   gulp.src("../bilibili-vis-gh-pages/assets/js/addonvis.js")
            .pipe(replace(/http:\/\/127\.0\.0\.1:3000/g, 'https://h12345jack.github.io/bilibili-Visualization'))
            .pipe(gulp.dest("../bilibili-vis-gh-pages/assets/js/"));
})


gulp.task('rename_bundle',['copy_build'] ,function(){
  
    return gulp.src("./build/static/js/*.js")
        .pipe(rename(function(path){
            path.dirname = ".";
            path.basename = 'bundle';
            path.extname = ".js";
          }))
        .pipe(gulp.dest('../bilibili-vis-gh-pages/static/js'));
});


gulp.task('copy_build',['clean'],function(){
    return gulp.src("./build/**")
            .pipe(gulp.dest('../bilibili-vis-gh-pages'));
});


gulp.task('clean', function(){
  return gulp.src("../bilibili-vis-gh-pages/static/**",{ read:false })
      .pipe(clean({force: true}));

})


gulp.task('cp-gh-pages', function(){
  return gulp.src('./gh-pages/**')
        .pipe(gulp.dest('../bilibili-vis-gh-pages'));
})