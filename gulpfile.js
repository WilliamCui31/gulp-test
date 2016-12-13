var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
var htmlmin = require('gulp-htmlmin');
var rev = require('gulp-rev-append');
// var livereload = require('gulp-livereload');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var sourcemaps = require('gulp-sourcemaps');

gulp.task('css',function(){
  gulp.src('src/css/**/*.css', { base: 'src' })
      .pipe(autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0']
      }))
      .pipe(cssmin({
        advanced: true,
        compatibility: '*',
        keepBreaks: false,
        keepSpecialComments: '*'
      }))
      .pipe(gulp.dest('dist'))
      .pipe(reload({stream: true}));
});

gulp.task('less',function(){
  gulp.src('src/less/**/*.css', { base: 'src/less' })
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0']
      }))
      .pipe(cssmin({
        advanced: true,
        compatibility: '*',
        keepBreaks: false,
        keepSpecialComments: '*'
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist/css'))
      .pipe(reload({stream: true}));
});

gulp.task('js',function(){
  return gulp.src('src/js/**/*.js',{ base: 'src' })
      .pipe(uglify())
      .pipe(gulp.dest('dist'))
      .pipe(reload({stream: true}));
});

gulp.task('image',function(){
  gulp.src('src/img/**/*.{png,jpg,gif,ico}')
      .pipe(cache(imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true,
        multipass: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      })))
      .pipe(gulp.dest('dist/img'))
      .pipe(reload({stream: true}));
});

gulp.task('html',function(){
  gulp.src('src/page/**/*.html')
      .pipe(rev())
      .pipe(cache(htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
      })))
      .pipe(gulp.dest('dist/page'))
      .pipe(reload({stream: true}));
});

// 合并js文件
// gulp.task('concatTest',function(){
//   return gulp.src('src/js/**/*.js')
//       .pipe(concat('all.js'))
//       .pipe(uglify())
//       .pipe(gulp.dest('dist/js'))
//       .pipe(reload({stream: true}));
// });

// livereload 刷新页面
// gulp.task('watch',function(){
//   livereload.listen();
//   gulp.watch(['src/css/**/*.css','src/less/**/*.css'],['css','less']);
// });

gulp.task('serve',['css','less','js','image','html'],function(){
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch(['src/css/**/*.css','src/less/**/*.css'],['css','less']);
  gulp.watch('src/js/**/*.js',['js']);
  gulp.watch('src/img/**/*.{png,jpg,gif,ico}',['image']);
  gulp.watch('src/page/**/*.html',['html']);
});

gulp.task('default',['serve']);
