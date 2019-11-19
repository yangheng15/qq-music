var gulp = require('gulp');
//less -> 自动添加c3前缀 -> 压缩 -> css文件   |  流操作

// 压缩html 需要用到 npm i gulp-htmlclean
var htmlClean = require('gulp-htmlclean');
//图片需要压缩，用到插件时npm i gulp-imagemin
var imageMin = require('gulp-imagemin');
// 压缩js 插件 gulp-uglify
var uglify = require('gulp-uglify');
// 去掉js中的debug 和 console  npm i gulp-strip-debug
var stripDebug = require('gulp-strip-debug');
//讲less 转换css npm i gulp-less
var trunLess = require('gulp-less');
//压缩css gulp-clean-css
var cleanCss = require('gulp-clean-css');
// 添加前缀需要 postcss autoprofixer
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
// 开启服务器 gulp-connect-reproxy
var server = require('gulp-connect-reproxy')
var floder = {
    src: 'src/',
    dist: 'dist/'
};

gulp.task('html', function (cd) {
    gulp.src(floder.src + 'html/*.html')
        .pipe(htmlClean())
        .pipe(gulp.dest(floder.dist + 'html/'))
    cd();
})

gulp.task('css', function (cd) {
    gulp.src(floder.src + 'css/*.less')
        .pipe(trunLess()) // less转化css
        .pipe(postCss([autoprefixer])) // 自动补前缀
        .pipe(cleanCss()) // 压缩
        .pipe(gulp.dest(floder.dist + 'css/'))
    cd();
})

gulp.task('js', function (cd) {
    gulp.src(floder.src + 'js/*.js')
        .pipe(stripDebug())
        .pipe(uglify()) // 压缩js
        .pipe(gulp.dest(floder.dist + 'js/'))
    cd();
})

//图片需要压缩，用到插件时npm i gulp-imagemin
gulp.task('image', function (cd) {
    gulp.src(floder.src + 'image/*')
        .pipe(imageMin())
        .pipe(gulp.dest(floder.dist + 'image/'))
    cd();
})


//gulp 3.0 执行方式
// gulp.task('default', ['html'], function () {
//
// });

// gulp 4.0 执行方式 需要使用 gulp.series 或者 使用 gulp.parallel
gulp.task("default", gulp.series('html', 'css', 'js', 'image',  function () {

}))
