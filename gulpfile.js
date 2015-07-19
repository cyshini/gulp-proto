/* Calling Gulp */
var gulp = require('gulp');

/* Required plugins */
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var uncss = require('gulp-uncss');
var livereload = require('gulp-livereload');
var ghPages = require('gulp-gh-pages');
var del = require('del');

/* Paths */
var source = './_source/';
var prod = './_build/';

/* Compile Sass */
gulp.task('sass', function() {
   return gulp.src(source + 'assets/scss/*.scss')
       .pipe(sass())
       .pipe(autoprefixer())
       .pipe(uncss({html: [source + '*.html']}))
       .pipe(gulp.dest(source + 'assets/css'))
       .pipe(gulp.dest(prod + 'assets/css'))
       .pipe(rename({suffix: '.min'}))
       .pipe(minifycss())
       .pipe(gulp.dest(source + 'assets/css'))
       .pipe(gulp.dest(prod + 'assets/css'))
       .pipe(livereload());
});

/* Watch files for changes */
gulp.task('watch', function() {
   livereload.listen();
   gulp.watch(source + 'assets/scss/*.scss', ['sass']);
   gulp.watch(source + 'assets/js/*.js', ['scripts']);
   gulp.watch(source + 'assets/img/*', ['images']);
   gulp.watch(['*.html']).on('change', livereload.changed);
});

gulp.task('default', ['sass', 'watch']);

/* Cleaning and deploying */
gulp.task('build', ['clean', 'sass'], function(){
  return gulp.src(source + '*.html')
  .pipe(gulp.dest(prod));
});

gulp.task('clean', function(cb){
  del([ prod + '**/*', ], cb);
});

gulp.task('deploy', ['build'], function(){
  return gulp.src(prod + '**/*')
    .pipe(ghPages({
      force: true
    }));
});
