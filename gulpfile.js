var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minifycss = require('gulp-minify-css');
var rename = require('gulp-rename');
var gzip = require('gulp-gzip');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var gzip_options = {
    threshold: '1kb',
    gzipOptions: {
        level: 9
    }
};

/* Compile Our Sass */
gulp.task('css', function() {
	return gulp.src('./scss/*.scss')
		.pipe(sass({
			includePaths: [ 'bower_components/foundation/scss' ]
		}))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('css'))
        .pipe(gzip(gzip_options))
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

gulp.task('scripts', function() {
	return gulp.src([
			'bower_components/jquery/dist/jquery.js',
			'bower_components/foundation/js/foundation/foundation.js',
			'bower_components/foundation/js/foundation/foundation.equalizer.js',
			'src/**/*.js'
		])
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./js'));
});

/* Watch Files For Changes */
gulp.task('watch', function() {
    livereload.listen();
	gulp.watch(['scripts']);
});

gulp.task('default', ['css', 'watch']);
