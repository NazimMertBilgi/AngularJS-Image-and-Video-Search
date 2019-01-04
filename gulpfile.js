var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    uglify = require("gulp-uglify");

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

//Minify JS
gulp.task('minify-js', function () {
    gulp.src([paths.js + '/**/*.js', '!' + paths.js + '/**/*.min.js'])
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.js));
});

//Watch
gulp.task('watch', function () {
    gulp.watch(paths.scss + '/**/*.scss', function (event) {
        gulp.run('compile-scss');
        gulp.run('minify-js');
        gulp.run('minify-css');
    });
});

//Build
gulp.task('build', ['compile-scss'], function () {
    gulp.run('minify-css');
    gulp.run('minify-js');
});

//Compile Scss Files
gulp.task('compile-scss', function () {
     return gulp.src(paths.scss + '/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.css));
});

//Minify Css
gulp.task('minify-css', function () {
    gulp.src([paths.css + '/**/*.css', '!' + paths.css + '/**/*.min.css'])
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.css));
});