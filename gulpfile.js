var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', function () {

    browserSync.init({
        notify: false,
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch("./app/sass/**/*.scss", ['sass']);
    gulp.watch("./app/index.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("./app/sass/main.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./app/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', ['sass', 'serve']);