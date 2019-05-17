var gulp = require('gulp'),
	sass = require('gulp-sass'),
	clean = require('gulp-clean'),//清空文件夹
	minifycss = require('gulp-minify-css'),//压缩css
    uglify = require('gulp-uglify'),//压缩js
    htmlMinify = require('gulp-html-minify'),//压缩html
	imagemin = require('gulp-imagemin'),//压缩图片
	concat = require('gulp-concat'),//合并文件
	gulpSequence = require('gulp-sequence'),//按顺序执行
    gulpFolders = require('gulp-folders'),
    path = require('path'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;


// gulp.task('sass', function() {
// 	gulp.src('src/sass/*.scss')
// 		.pipe(sass())
// 		.pipe(gulp.dest('src/css'));
// });

gulp.task("clean", function () {
    return gulp.src(['dist/*'])
        .pipe(clean({
            force: true
        }));
});

gulp.task('minifycss', function() {
    gulp.src('src/sass/*.scss') 
    	.pipe(sass())
    	.pipe(concat('style.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('imagemin', function() {
    return gulp.src('src/img/*.*') 
        .pipe(imagemin({
			optimizationLevel: 5, //类型：Number 默认：5 取值范围：0-7（优化等级）
			progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
			interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
			multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
		}))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('libs', function () {
    return gulp.src('libs/**/*.*')
        .pipe(gulp.dest('dist/libs'));
});

gulp.task('angularJs', gulpFolders('src/angular', function (folder) {
    return gulp.src(path.join('src/angular', folder, '/**/*.js'))
        .pipe(concat(folder + '.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('dist/angular'));
}));

gulp.task('angularhtml', function () {
    return gulp.src('src/angular/views/*.html')
        .pipe(htmlMinify())
        .pipe(gulp.dest('dist/angular/views'));
});

gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(htmlMinify())
        .pipe(gulp.dest('dist'));
});

gulp.task('browserSync', function() {
	browserSync.init({
		port: 8888,
        server: {
            baseDir: './dist'
        }
    });
    gulp.watch(['./src/sass/*.scss', './src/img/*.*', './src/angular/**/*.*', './index.html'], ['minifycss', 'imagemin', 'angularJs', 'angularhtml', 'html']).on('change', reload);
});

gulp.task('build', gulpSequence('clean', ['minifycss', 'imagemin', 'libs', 'angularJs', 'angularhtml', 'html']));

gulp.task('default', ['browserSync', 'build']);

