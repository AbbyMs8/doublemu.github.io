var gulp = require('gulp'),
    minifyCss = require('gulp-minify-css'),
    // jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    rev = require('gulp-rev'),
    concat = require('gulp-concat'),
    revReplace = require('gulp-rev-replace'),
    useref = require('gulp-useref'),
    revReplace = require('gulp-rev-replace'),
    revCollector = require('gulp-rev-collector');
     
//清空文件夹，避免资源冗余
gulp.task("clean",function(){
    return gulp.src('dist',{read:false}).pipe(clean());
})

// //css文件压缩，更改版本号，并通过rev.manifest将对应的版本号用json表示出来
gulp.task('css',function(){
    return gulp.src('./app/css/*.css')
    //.pipe( concat('wap.min.css') )
    .pipe(minifyCss())
    .pipe(rev())
    .pipe(gulp.dest('dist/css/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/rev/css'))
});
gulp.task("copy",function(){
	return gulp.src('./app/pages/*.html')
	.pipe(gulp.dest('dist/pages/'));
})

// // //js文件压缩，更改版本号，并通过rev.manifest将对应的版本号用json表示出
gulp.task('js',function(){
    return gulp.src('./app/js/*.js')
    //.pipe( concat('wap.min.js') )
    // .pipe(jshint())
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('dist/js/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/rev/js'))
});
 
// //通过hash来精确定位到html模板中需要更改的部分,然后将修改成功的文件生成到指定目录
gulp.task('rev',function(){
    return gulp.src(['dist/rev/**/*.json','./dist/pages/*.html'])
    .pipe( revCollector() )
    .pipe(gulp.dest('dist/app/pages/'));
});
 
// //合并html页面内引用的静态资源文件
// gulp.task('html', function () {
//     return gulp.src('dist/app/pages/*.html')
//     .pipe(useref())
//     .pipe(rev())
//     .pipe(revReplace())
//     .pipe(gulp.dest('dist/html/'));
// })

gulp.task('default',['clean','css','copy','js','rev']);