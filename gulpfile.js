var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;


gulp.task('sass', function() {
	gulp.src('src/sass/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('src/css'));
});

gulp.task('browserSync', function() {
	browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch(['src/**/*.scss', './index.html'], ['sass']).on('change', reload);
});

gulp.task('default', ['browserSync']);

