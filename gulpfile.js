var browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    del = require('del'),
    gulp = require('gulp'),
    source = require('vinyl-source-stream'),
    uglify = require('gulp-uglify');

gulp.task('clean', function () {
	return del(['build']);
});

gulp.task('pages', function () {
	return gulp.src('src/*.html')
		.pipe(gulp.dest('build'));
});

gulp.task('libs', function () {
	return gulp.src('src/libs/**')
		.pipe(gulp.dest('build/libs'));
});

gulp.task('deps', ['libs'], function () {
	return browserify('src/dependencies.js')
		.bundle()
		.pipe(source('dependencies.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('build/'));
});

gulp.task('scripts', ['deps'], function () {
	return gulp.src('src/present.js')
		.pipe(gulp.dest('build/'));
});

gulp.task('styles', function () {
	return gulp.src('src/*.css')
		.pipe(gulp.dest('build/'));
});

gulp.task('images', function () {
	return gulp.src('src/images/*.png')
		.pipe(gulp.dest('build/images'));
});

gulp.task('default', ['clean'], function () {
	gulp.start('pages', 'scripts', 'styles', 'images');
});
