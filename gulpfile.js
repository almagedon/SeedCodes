const gulp = require('gulp'),
      gls = require('gulp-live-server');
      sass = require('gulp-sass');
      minifyCSS = require('gulp-csso');
      sourcemaps = require('gulp-sourcemaps');
      autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', () => {
  return gulp.src('./style/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'expanded',
                sourceComments:true,
                }).on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./style'));
});

gulp.task('scss:watch', () => {
  gulp.watch('./style/**/*.scss', ['scss']);
}); 

gulp.task('serve', () => {
    var server = gls.static('.', 9000);
    server.start();

  gulp.watch(['style/**/*.scss', '**/*.html'], (file) => {
    server.notify.apply(server, [file]);
  });

});

 
gulp.task('default', ['serve','scss', 'scss:watch']);
