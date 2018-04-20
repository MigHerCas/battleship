var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('watch', function() {

    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });

    watch('./app/index.html', function () {
        browserSync.reload();
    });

    watch('./app/sass/**/*.scss', ['sass'], function() {
        gulp.start('sass:watch');
    });
});

gulp.task('sass', function () {
    return gulp.src('./app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css/'));
});

gulp.task('sass:watch', function () {
    return gulp.src('./app/css/styles.css')
        .pipe(browserSync.stream());
});
