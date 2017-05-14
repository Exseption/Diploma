const gulp = require('gulp');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const pug = require('gulp-pug');
const jshint = require('gulp-jshint');
const stylish = require('jshint-stylish');
const del = require('del');
const newer = require('gulp-newer');
gulp.task('dev', function() {
    browserSync.init({
        server: 'public',
        open: false
    });
    browserSync.watch('public/**',{ignored: 'public/templates/pugs/*.pug'})
        .on('change', browserSync.reload);
});
gulp.task('pug', function () {
    return gulp.src('public/templates/pugs/*.pug')
         .pipe(newer('public/templates'))
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest('public/templates'));
});
gulp.task('concat-js', function () {
    return gulp.src(['./public/components/**/*.js', './public/shared/**/*.js', './models/*.js', 'app.js', './public/app.module.js'])
        .pipe(concat('app.all.js'))

        .pipe(gulp.dest('./dist/'))
});
gulp.task('concat-html', function () {
    return gulp.src(['./public/**/*.html', './public.index.html'])
        .pipe(concat('all.html.html'))
        .pipe(gulp.dest('./dist/'))
});
gulp.task('default', ['dev']);