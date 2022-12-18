const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

gulp.task('server', function() {
	browserSync({
		server: true
	});

	gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
	return gulp.src("sass/**/*.+(scss|sass)")
			.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
			.pipe(autoprefixer())
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(gulp.dest("css"))
			.pipe(browserSync.stream());
});

gulp.task('watch', function() {
	gulp.watch("sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
	gulp.watch("js/**/*.js").on('change', gulp.parallel('scripts'));
	gulp.watch("assets/fonts/**/*").on('all', gulp.parallel('fonts'));
	gulp.watch("assets/icons/**/*").on('all', gulp.parallel('icons'));
	gulp.watch("assets/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task('scripts', function() {
	return gulp.src("js/**/*.js")
		.pipe(browserSync.stream());
});

gulp.task('fonts', function() {
	return gulp.src("assets/fonts/**/*")
		.pipe(browserSync.stream());
});

gulp.task('icons', function() {
	return gulp.src("assets/icons/**/*")
		.pipe(browserSync.stream());
});


gulp.task('images', function() {
	return gulp.src("assets/img/**/*")
		.pipe(imagemin())
		.pipe(browserSync.stream());
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'images'));