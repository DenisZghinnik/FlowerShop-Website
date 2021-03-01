var gulp 		 = require('gulp');
	sass 		 = require("gulp-sass"), // переводит SASS в CSS
	browserSync  = require('browser-sync'), //local server
    autoprefixer = require('gulp-autoprefixer'), // Проставлет вендорные префиксы в CSS для поддержки старых браузеров
    concat       = require("gulp-concat"), // Объединение файлов - конкатенация
    del 	     = require('del'), // clean folder


gulp.task('server', function() {
	browserSync({server: {baseDir: 'src/', index: "index.html"},notify: false,
	})
});

gulp.task('styles', function() {
	return gulp.src("src/scss/custom.scss")
		.pipe(sass({ outputStyle: 'expanded' }))
		.pipe(autoprefixer({
		grid: true,
		overrideBrowserslist: ['last 10 versions']
		}))
		.pipe(gulp.dest("src/css"))
		.pipe(browserSync.stream({ stream: true }))
});

gulp.task('html', function(){
    return gulp.src('src/index.html')
    	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('scripts', function() {
    return gulp.src([
    	'node_modules/jquery/dist/jquery.min.js',
    	// 'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
    	// 'node_modules/bootstrap/dist/js/bootstrap.js',
    	'node_modules/slick-carousel/slick/slick.js',
    	'src/js/custom.js'])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', gulp.parallel('styles'));
    gulp.watch('src/index.html', gulp.parallel('html'));
    gulp.watch('src/js/custom.js', gulp.parallel('scripts'));
});
gulp.task('images', function() {
    return gulp.src('src/img/**/*.{png,jpg,jpeg,webp,raw,svg}')
        .pipe(gulp.dest('dist/img'));  
});

gulp.task('clean', async function() {
    return del.sync('dist'); 
});

gulp.task('prebuild', async function() {

    var buildCss = gulp.src('src/css/custom.css') // Переносим библиотеки в продакшен
 
    .pipe(gulp.dest('dist/css'))

    var buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
    .pipe(gulp.dest('dist/fonts'))

    var buildJs = gulp.src('src/js/scripts.js') // Переносим скрипты в продакшен
    .pipe(gulp.dest('dist/js'))

    var buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
    .pipe(gulp.dest('dist'));
});

gulp.task("default", gulp.parallel('styles', 'scripts', 'server', 'watch'));
gulp.task('build', gulp.parallel('prebuild', 'clean', 'images', 'styles', 'scripts'));