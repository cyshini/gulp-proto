/* Required plugins */

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var gzip = require('gulp-gzip');
var livereload = require('gulp-livereload');
var ghPages = require('gulp-gh-pages');
var del = require('del');

/* Configure GZip compression */
var gzip_options = {
   threshold: '1kb',
   gzipOptions: {
       level: 9
   }
};

/* Compile Our Sass */
gulp.task('sass', function() {
   return gulp.src('assets/css/*.scss')
       .pipe(sass())
       .pipe(gulp.dest('dist/assets/css'))
       .pipe(rename({suffix: '.min'}))
       .pipe(minifycss())
       .pipe(gulp.dest('dist/assets/css'))
       .pipe(gzip(gzip_options))
       .pipe(gulp.dest('dist/assets/css'))
       .pipe(livereload());
});

/* Watch Files For Changes */
gulp.task('watch', function() {
   livereload.listen();
   gulp.watch('assets/css/*.scss', ['sass']);
   gulp.watch('assets/js/*.js', ['scripts']);
   gulp.watch('assets/img/*', ['images']);
   gulp.watch(['dist/**']).on('change', livereload.changed);
   gulp.watch(['*.html']).on('change', livereload.changed);
});

gulp.task('default', ['sass', 'watch']);

/**
 * Global tasks
 */
gulp.task('dist', ['clean', 'sass'], function(){
  return gulp.src("*.html", {base: "."})
  .pipe(gulp.dest("dist/"));
});

gulp.task('clean', function(cb){
  del([ "dist/" + '**/*', ], cb);
});

gulp.task('deploy', ['dist'], function(){
  return gulp.src('./dist/**/*')
    .pipe(ghPages({
      force: true
    }));
});
