var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),           //sass编译
    concat = require('gulp-concat'),            //js合并
    uglify = require('gulp-uglify'),            //js压缩
    jshint = require('gulp-jshint'),            //js语法检测
    cssmin = require('gulp-cssmin'),            //css文件压缩
    rename = require('gulp-rename'),            //重命名
    imagemin = require('gulp-imagemin'),        //图片压缩
    htmlreplace = require('gulp-html-replace'),//html页面引用替换
    ngAnnotate = require('gulp-ng-annotate'),   //代码压缩 $scope注入
    webserver = require('gulp-webserver');      //服务器
//html
gulp.task('html',function () {
    gulp.src('./index.html')
        .pipe(gulp.dest('./dist'));
});
//合并自定的JS文件
gulp.task('js',function () {
    gulp.src(['./app.js','./src/components/**/init.js','./src/components/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())//压缩后找到$scope
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./dist/js'));
});
//替换页面引用
gulp.task('replace',function () {
    var opts={
        js:['./js/lib-bundle.min.js','./js/app.min.js']
    };
    gulp.src('./index.html')
        .pipe(htmlreplace(opts))
        .pipe(gulp.dest('./dist'));
});
//合并第三方库
gulp.task('lib-bundle',function () {
    var files=[
        './src/lib/angular/angular-1.4.6.min.js',
        './src/lib/angular/angular-ui-router.js'
    ];
    gulp.src(files)
        .pipe(concat('lib-bundle.js'))
        .pipe(uglify())
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('./dist/js'));
});
//sass任务
gulp.task('sass',function () {
   return sass('./src/assets/css/app.scss')
       .on('error',sass.logError)
       .pipe(gulp.dest('./src/assets/css'))
       .pipe(cssmin())
       .pipe(rename({suffix:'.min'}))
       .pipe(gulp.dest('./dist/css'))
});
//imgs
gulp.task('imgs',function () {
   gulp.src('./src/assets/imgs/**/*')
       .pipe(imagemin())
       .pipe(gulp.dest('./dist/imgs'))
});
//模板
gulp.task('templates',function () {
   gulp.src('./src/components/**/templates/*.html')
       .pipe(gulp.dest('./dist/components'));
});
//监听sass
gulp.task('sassWatch',function () {
   gulp.watch('./src/assets/css/**/*.scss',['sass']);
});
//监听HTML，JS
gulp.task('auto',function () {
   gulp.watch('./index.html',['html']);
   gulp.watch('./src/components/**/templates/*.html',['templates']);
   gulp.watch(['./src/components/**/*.js','./app.js'],['js']);
});
//服务器
gulp.task('webserver',['sassWatch','auto'],function () {
   gulp.src('./dist')
       .pipe(webserver({
           host:'localhost',
           port:8888,
           livervload:true,
           open:false
       }));
});
// 打包任务
gulp.task('default',function () {
   gulp.start('templates','imgs','lib-bundle','js','html','sass');
});






















