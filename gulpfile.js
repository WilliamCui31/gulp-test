// 载入插件
var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    htmlmin = require('gulp-htmlmin');

    var browserSync = require('browser-sync').create();
    var reload = browserSync.reload;

// less
gulp.task('less', function() {
  return gulp.src('src/css/*.less')
    .pipe(less())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    // .pipe(gulp.dest('dist/css'))
    // .pipe(rename({ suffix: '.min' }))
    .pipe(cssmin({
      advanced: true,
      compatibility: '*',
      keepBreaks: false,
      keepSpecialComments: '*'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({stream: true}));
});

// less
gulp.task('css', function() {
  return gulp.src('src/css/*.css')
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    // .pipe(gulp.dest('dist/css'))
    // .pipe(rename({ suffix: '.min' }))
    .pipe(cssmin({
      advanced: true,
      compatibility: '*',
      keepBreaks: false,
      keepSpecialComments: '*'
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({stream: true}));
});

// 脚本
gulp.task('scripts', function() {
  return gulp.src('src/js/**/*.js')
    // .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    // .pipe(concat('main.js'))
    // .pipe(gulp.dest('dist/js'))
    // .pipe(rename({ suffix: '.min' }))
    // .pipe(gulp.dest('dist/js'))
    .pipe(reload({stream: true}));
});

// 图片
gulp.task('images', function() {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img'))
    .pipe(reload({stream: true}));
});

gulp.task('pages',function(){
  return gulp.src('src/page/**/*.html')
      .pipe(htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
      }))
      .pipe(gulp.dest('dist/page'))
      .pipe(reload({stream: true}));
});

// 清理
gulp.task('clean',function(){
  return gulp.src(['dist/css','dist/img','dist/js','dist/page'],{ read: false })
      .pipe(clean());
})

gulp.task('serve',['clean'],function(){

  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.run('less','css','scripts','images','pages');

  gulp.watch('src/css/*.less',['less']);
  gulp.watch('src/css/*.css',['css']);
  gulp.watch('src/js/**/*.js',['scripts']);
  gulp.watch('src/img/**/*.{png,jpg,gif,ico}',['images']);
  gulp.watch('src/page/**/*.html',['pages']);
});

gulp.task('default',['serve']);
