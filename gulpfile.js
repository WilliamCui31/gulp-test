var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-clean-css');
    cssver = require('gulp-make-css-url-version');

gulp.task('css',function(){
  gulp.src('src/css/**/*.css', { base: 'src' })
      .pipe(autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0']
      }))
      .pipe(cssver())
      .pipe(cssmin({
        advanced: true,
        compatibility: '*',
        keepBreaks: false,
        keepSpecialComments: 'ie7'
      }))
      .pipe(gulp.dest('dist'));
});
gulp.task('less',function(){
  gulp.src('src/less/**/*.less', { base: 'src/less' })
      .pipe(less())
      .pipe(autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0']
      }))
      .pipe(cssver())
      .pipe(cssmin({
        advanced: true,
        compatibility: '*',
        keepBreaks: false,
        keepSpecialComments: 'ie7'
      }))
      .pipe(gulp.dest('dist/css'));
});


gulp.task('default',['less','css']);
