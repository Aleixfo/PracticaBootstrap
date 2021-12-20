var gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    uglify = require("gulp-uglify"),
    htmlmin = require('gulp-htmlmin'),
    { series, parallel } = require('gulp');


//Compilar els arxius .scss de la carpeta "src/sass" i ficar-los dins una carpeta  "src/css"
function buildStyles() {
    return gulp.src('./sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
};
exports.buildStyles = buildStyles;

//Pipe del CSS de bootstrap a dist
function cssbootstrap() {
    return gulp.src('./node_modules/bootstrap/dist/css/*')
        .pipe(gulp.dest('./dist/css-bootstrap'));
};
exports.pipecss = cssbootstrap;

//Pipe del JAVASCRIPT de bootstrap a dist
function jsbootstrap() {
    return gulp.src('./node_modules/bootstrap/dist/js/*')
        .pipe(gulp.dest('./dist/js-bootstrap'));
};
exports.pipejs = jsbootstrap;

//Tasca Conjunta Dels dos pipes
gulp.task('pipe', series(cssbootstrap, jsbootstrap));

//Minimitza els arxius de la carpeta .css i deixa'ls dins la carpeta "dist/css"
function minimitzacss() {
    return gulp.src('./css/*.css')
        .pipe(sass({ outputStyle: 'compressed', sourceComments: false }))
        .pipe(gulp.dest('./dist/css'));
};
exports.mincss = minimitzacss;

//Minimitza els arxius de la carpeta "js" i deixa'ls dins "dist/js".
function minimitzajs() {
    return gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
};
exports.minjs = minimitzajs;

//Minimitza els arxius .html i els deixa dins "dist".
function minimitzahtml() {
    return gulp.src('./*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
};
exports.minhtml = minimitzahtml;

//Tasca Conjunta
gulp.task('MinTot', series(buildStyles, minimitzacss, minimitzajs, minimitzahtml));