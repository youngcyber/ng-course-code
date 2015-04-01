var
	gulp = require('gulp'),
	connect = require('gulp-connect');

var
	src = [
		'*.html',
		'app/**/*.html',
		'app/**/*.js'
	];

gulp.task('connect', function() {
	connect.server({
		root: __dirname,
		livereload: true,
		port: 8000
	});
});

gulp.task('watch', function() {
	gulp.watch(src, ['reload']);
});

gulp.task('reload', function() {
	gulp.src(src)
		.pipe(connect.reload());
});

gulp.task('default', ['connect', 'watch']);