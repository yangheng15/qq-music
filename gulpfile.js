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
var connect = require('gulp-connect');

//判断环境变量，如果是开发环境不压缩文件
var devMod = process.env.NODE_ENV === 'development';
// set NODE_ENV=development 设置环境变量
console.log( process.env.NODE_ENV);
console.log(devMod);
var floder = {
    src: 'src/',
    dist: 'dist/'
};

gulp.task('html', function (cd) {
    var page = gulp.src(floder.src + 'html/*.html');
        if(!devMod) {
            console.log('执行了压缩html')
            page.pipe(htmlClean())
        }
        page.pipe(connect.reload())
        .pipe(gulp.dest(floder.dist + 'html/'))
    cd();
})

gulp.task('css', function (cd) {
    var page = gulp.src(floder.src + 'css/*.less')
        .pipe(trunLess()) // less转化css
        .pipe(postCss([autoprefixer])) // 自动补前缀
        if(!devMod) {
            page.pipe(cleanCss()) // 压缩
        }
        page.pipe(connect.reload())
        .pipe(gulp.dest(floder.dist + 'css/'))
    cd();
})

gulp.task('js', function (cd) {
    var page = gulp.src(floder.src + 'js/*.js')
        .pipe(stripDebug())
        if(!devMod) {
            page.pipe(uglify()) // 压缩js
        }
        page.pipe(connect.reload())
        .pipe(gulp.dest(floder.dist + 'js/'))
    cd();
})

//图片需要压缩，用到插件时npm i gulp-imagemin
gulp.task('image', function (cd) {
    var page = gulp.src(floder.src + 'image/*')
        if(!devMod) {
            page.pipe(imageMin()) // 压缩图片
        }
        page.pipe(gulp.dest(floder.dist + 'image/'))
    cd();
})


//gulp 3.0 执行方式
// gulp.task('default', ['html'], function () {
//
// });

gulp.task('server', function (cd) {
    connect.server({
        port: '12306',
        livereload: true
    }); // 开启一个服务
    cd();
})

gulp.task('watch', function (cd) {
    gulp.watch(floder.src + 'html/*', gulp.series('html'));
    gulp.watch(floder.src + 'css/*',gulp.series('css'));
    gulp.watch(floder.src + 'js/*',gulp.series('js'));
    cd()
})
// gulp 4.0 执行方式 需要使用 gulp.series 或者 使用 gulp.parallel
gulp.task("default", gulp.series('html', 'css', 'js', 'image', 'server', 'watch',  function () {

}))


