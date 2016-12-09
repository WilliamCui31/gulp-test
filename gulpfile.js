var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('css',function(){
  gulp.src('src/less/**/*.less')
      .pipe(less())
      .pipe(autoprefixer({ browsers: ['last 2 versions', 'Android >= 4.0'] }))
      .pipe(gulp.dest('dist/css/'));
});

gulp.task('default',['css']);
