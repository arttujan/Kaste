'use strict';
// Get things set up
// -------------------------------------------------------------------

const nodemon = require("nodemon");
require('dotenv').config();
    // Include Gulp
var gulp                    = require("gulp"),

    // HTML plugins
    fileinclude             = require("gulp-file-include"),
    htmlmin                 = require("gulp-htmlmin"),

    // CSS plugins
    sass                    = require("gulp-sass"),
    autoprefixer            = require("gulp-autoprefixer"),
    cssmin                  = require("gulp-clean-css"),
    rename                  = require("gulp-rename"),

    // JS plugins
    concat                  = require("gulp-concat"),
    uglify                  = require("gulp-uglify"),

    // Image plugin
    imagemin                = require("gulp-imagemin"),

    // General plugins
    gutil                   = require("gulp-util"),
    plumber                 = require("gulp-plumber"),
    size                    = require("gulp-size"),
    watch                   = require("gulp-watch"),
    browserSync             = require("browser-sync"),
    reload                  = browserSync.reload;

// Tasks
// -------------------------------------------------------------------
// Start server
// gulp.task("browser-sync", function() {
//     browserSync({
//         server: {
//             baseDir: "dist"
//         },
//         ghostMode: false
//     });
// });

// Notify on error with a beep
var onError = function(error) {
    console.log(gutil.colors.red(error.message));
    // https://github.com/floatdrop/gulp-plumber/issues/17
    this.emit("end");
    gutil.beep();
};

// HTML task
gulp.task("html", function() {
    return gulp.src("src/html/*.html")
        // Prevent gulp.watch from crashing
        .pipe(plumber(onError))
        // Set up HTML templating
        .pipe(fileinclude({
            prefix: "@@",
            basepath: "src/html"
        }))
        // Clean up HTML a little
        .pipe(htmlmin({
            removeCommentsFromCDATA: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            caseSensitive: true,
            minifyCSS: true
        }))
        // Where to store the finalized HTML
        .pipe(gulp.dest("dist"));
});

// CSS task
gulp.task("css", function() {
    return gulp.src("src/scss/main.scss")
        // Prevent gulp.watch from crashing
        .pipe(plumber(onError))
        // Compile Sass
        .pipe(sass({ style: "compressed", noCache: true }))
        // parse CSS and add vendor-prefixed CSS properties
        .pipe(autoprefixer({
            browsers: ["last 2 versions"]
        }))
        // Minify CSS
        .pipe(cssmin())
        // Rename the file
        .pipe(rename("production.css"))
        // Show sizes of minified CSS files
        .pipe(size({ showFiles: true }))
        // Where to store the finalized CSS
        .pipe(gulp.dest("dist/css"));
});

// JS task
gulp.task("js", function() {
    return gulp.src("src/js/**/*")
        // Prevent gulp.watch from crashing
        .pipe(plumber(onError))
        // Concatenate all JS files into one
        .pipe(concat("production.js"))
        // Minify JS
        .pipe(uglify())
        // Where to store the finalized JS
        .pipe(gulp.dest("dist/js"));
});

// Image task
gulp.task("images", function() {
    return gulp.src("src/img/**/*.+(png|jpeg|jpg|gif|svg)")
        // Prevent gulp.watch from crashing
        .pipe(plumber(onError))
        // Minify the images
        .pipe(imagemin())
        // Where to store the finalized images
        .pipe(gulp.dest("dist/img"));
});



gulp.task('nodemon', function (cb) {
    
    var started = false;
	
	return nodemon({
        script: 'index.js'
	}).on('start', function () {
        // to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
            setTimeout(cb, 500);
			started = true; 
		} 
	});
});

// Use default task to launch BrowserSync and watch all files
gulp.task("default", ["browser-sync"], function () {
    // All browsers reload after tasks are complete
    // Watch HTML files
    watch("src/html/**/*", function () {
        gulp.start("html", reload);
    });
    // Watch Sass files
    watch("src/scss/**/*", function () {
        gulp.start('css', reload);
    });
    // Watch JS files
    watch("src/js/**/*", function () {
        gulp.start("js", reload);
    });
    // Watch image files
    watch("src/img/**/*.+(png|jpeg|jpg|gif|svg)", function () {
        gulp.start("images", reload);
    });
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:" + process.env.PORT + "/",
        files: ["dist/*/**"],
        //browser: "google chrome",
        port: process.env.PROXY_PORT,
    });
});