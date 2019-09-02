'use strict'; // Use Javascript.

// Declaqre gulp modules.
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css'),
    flatmap = require('gulp-flatmap'),
    htmlmin = require('gulp-htmlmin');

// Create task in charge of converting scss files to css files.
gulp.task('sass', () => {
    return gulp.src('./css/*.scss')             // Gets files from source folder.
    .pipe(sass()).on('error', sass.logError)    // Applies function to files.
    .pipe(gulp.dest('./css'));                  // Throws files on destination folder.
});

// Create task in charge of listening to any changes on scsss files and then call the sass task.
gulp.task('sass:watch', () => {
    gulp.watch('./css/*.scss', gulp.series('sass'));
});

// Create task in charge of listening to any change in files indicated in order to reload the server.
gulp.task('browser-sync', () => {

    // Declare files to listen to.
    var files = [
        './*.html',
        './css/*.css',
        './js/*.js',
        './img/*.{png,jpg,gif}',
    ];

    // Initialize browser sync indicating the files.
    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
});

// Create task in charge of running the server.
gulp.task('default', gulp.parallel('browser-sync', 'sass:watch')); // It should be series instead of parallel, not really sure why it works though

// Create task in charge of cleaning the dist folder.
gulp.task('clean', () => {
    return del(['dist']);
});

// Create task in charge of copying the fonts indicated into the destination folder.
gulp.task('copyfonts', () => {
    return gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')   // Gets files from source folder.
    .pipe(gulp.dest('./dist/fonts'));                                               // Throws files on destination folder.
});

// Create task in charge of minify the images indicated and throw them into the destination folder.
gulp.task('imagemin', () => {
    return gulp.src('img/*.{png,jpg,gif}')                                          // Gets files from source folder.
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true}))   // Applies function to files.
    .pipe(gulp.dest('dist/img'));                                                   // Throws files on destination folder.
});

// Create task in charge of managing the html, css and js files and throw them into the destination folder.
gulp.task('usemin', () => {
    return gulp.src('./*.html')                                                     // Gets files from source folder.
    .pipe(flatmap((stream, file) => {                                               // Applies function to files.
        return stream
        .pipe(usemin({
            css: [rev()],
            html: [() => { return htmlmin({ collapseWhitespace: true })}],
            js: [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss: [cleanCss(), 'concat']
        }))
    }))
    .pipe(gulp.dest('dist/'));                                                      // Throws files on destination folder.
});

// Create task in charge of creating the distribution folder.
gulp.task('build', gulp.series('clean', 'copyfonts', 'imagemin', 'usemin'));