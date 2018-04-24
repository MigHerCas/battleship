
let gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('watch', function () {

    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });

    watch('./app/index.html', function () {
        browserSync.reload();
    });

    watch('./app/assets/styles/sass/**/*.scss', function () {
        gulp.start('cssInject');
    });

});

gulp.task('cssInject', ['sass'], function () {
    return gulp.src('./app/temp/styles/main.css')
        .pipe(browserSync.stream());
});