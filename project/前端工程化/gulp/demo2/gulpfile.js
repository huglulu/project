var gulp = require('gulp');
var rjs = require('gulp-requirejs');
var minifycss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	minhtml = require('gulp-htmlmin'),
	clean = require('gulp-clean'),
	jshint = require('gulp-jshint'),
	imagemin = require('gulp-imagemin'),
	browserSync = require('browser-sync').create();

// var cssFiles = ['./src/css/base.css','./src/css/index.css'];

gulp.task('cssBuild',function(){
	gulp.src('src/css/*.css')
	.pipe(concat('merge.min.css'))
	.pipe(minifycss())
	.pipe(gulp.dest('./dist/css'));
})

gulp.task('htmlBuild',function(){
	return gulp.src('./*.html')
		.pipe(minhtml({collapseWhitespace:true}))   //.pipe传入下一层处理
		.pipe(gulp.dest('./dist'));
});

gulp.task('requirejsBuild',function(argument){
	return rjs({
			    baseUrl: "./src/js",
			    paths: {
			        'jquery': 'lib/bower_components/jquery/dist/jquery.min'
			    },
			    name: "main",
			    out: "merge.min.js"	
	})
	// .pipe(uglify())
	.pipe(gulp.dest('./dist/js'));

	gulp.src('./src/js/lib/bower_components/requirejs/require.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
	.pipe(concat('merge.js'))
	.pipe(rename({
		suffix:'.min'
	}))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'));
})

gulp.task('imgBuild',function(){
	gulp.src('./src/img/*')
	.pipe(imagemin())
	.pipe(gulp.dest('dist/img'));
})
gulp.task('clear',function(){
	gulp.src('dist/*',{read:false})
	.pipe(clean());
})


//配置自动更新 
// gulp.task('watch',['cssBuild','requirejsBuild','imgBuild','htmlBuild'],function(){
// 	browserSync.reload();
// });

// gulp.task('server',function(){
// 	browserSync.init({
// 		server:{
// 			baseDir:'./'
// 		}
// 	});
// 	gulp.watch(['./src/**/*.css','./*.html','./src/**/*.js','./src/img/*'],['watch']);
// })

gulp.task('build',['cssBuild','htmlBuild','requirejsBuild','imgBuild']);
