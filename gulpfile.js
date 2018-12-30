var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename');

//Configurations ****************************************************
var paths = {
    css: './assets/css',
    js: './assets/js',
    scss: './assets/scss'
};

//Tasks *************************************************************
gulp.task('default', function () {
    console.log("Page - Gulp Command List");
    console.log("\n----------------------------\n");
    console.log("gulp watch");
    console.log("gulp compile-scss");
    console.log("gulp build");
    console.log("\n----------------------------\n");
});

//Watch
gulp.task('watch', function () {
    gulp.watch(paths.scss + '/**/*.scss', function (event) {
        gulp.run('compile-scss');
    });
});

//Build
gulp.task('build', ['compile-scss'], function () {
    gulp.run('minify-css');
});

//Compile Scss Files
gulp.task('compile-scss', function () {
    return gulp.src(paths.scss + '/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.css));
});

//Minify Css
gulp.task('minify-css', function () {
    gulp.src(paths.css + '/**/*.css')
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.css));
});