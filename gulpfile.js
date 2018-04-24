var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var normalize = require('node-normalize-scss');

// Static Server + watching scss/html files
gulp.task('serve', function () {

    browserSync.init({
        notify: false,
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch("./app/assets/styles/sass/**/*.scss", ['sass']);
    gulp.watch("./app/index.html").on('change', browserSync.reload);

});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("./app/assets/styles/sass/main.scss")
        .pipe(sass({
            includePaths: require('node-normalize-scss').includePaths
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%', 'Firefox ESR'],
            cascade: false
        }))
        .pipe(gulp.dest("./app/temp/styles/"))
        .pipe(browserSync.stream());
});

gulp.task('watch', ['sass', 'serve']);