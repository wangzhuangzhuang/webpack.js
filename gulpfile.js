/**
 * Created by sloong on 2016/6/14.
 */
'use strict';

var gulp = require('gulp');
var webpack = require('webpack');

//用于gulp传递参数
var minimist = require('minimist');

var gutil = require('gulp-util');

var src = process.cwd() + '/src';
var assets = process.cwd() + '/dist';

var knownOptions = {
    string: 'env',
    default: {env: process.env.NODE_ENV || 'production'}
};

var options = minimist(process.argv.slice(2), knownOptions);

var webpackConf = require('./webpack.config');
var webpackConfDev = require('./webpack-dev.config');

var remoteServer = {
    host: '192.168.56.129',
    remotePath: '/data/website/website1',
    user: 'root',
    pass: 'password'
};
var localServer = {
    host: '192.168.56.130',
    remotePath: '/data/website/website1',
    user: 'root',
    pass: 'password'
}

//check code
gulp.task('hint', function () {
    var jshint = require('gulp-jshint')
    var stylish = require('jshint-stylish')

    return gulp.src([
        '!' + src + '/js/lib/**/*.js',
        src + '/js/**/*.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
})

// clean asserts
gulp.task('clean', ['hint'], function () {
    var clean = require('gulp-clean');
    return gulp.src(assets, {read: true}).pipe(clean())
});

//run webpack pack
gulp.task('pack', ['clean'], function (done) {
    var _conf = options.env === 'production' ? webpackConf : webpackConfDev;
    webpack(_conf, function (err, stats) {
        if (err) throw new gutil.PluginError('webpack', err)
        gutil.log('[webpack]', stats.toString({colors: true}))
        done()
    });
});

//default task
gulp.task('default', ['pack'])

//deploy assets to remote server
gulp.task('deploy', function () {
    var sftp = require('gulp-sftp');
    var _conf = options.env === 'production' ? remoteServer : localServer;
    return gulp.src(assets + '/**')
        .pipe(sftp(_conf))
})


//引入gulp和gulp插件
var gulp = require('gulp'),
  assetRev = require('gulp-asset-rev'),
  runSequence = require('run-sequence'),
  minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  rev = require('gulp-rev'),
  revCollector = require('gulp-rev-collector');
var fs = require('fs')
var path = require('path')
var gutil = require('gulp-util')
var data = require('gulp-data')
var browserSync = require('browser-sync')
var ejs = require('gulp-ejs')
 
//定义css、js源文件路径
var cssSrc = 'css/*.css',
  jsSrc = 'js/*.js';
  var tplDir = 'src/templates'  // 模版目录
var distDir = 'src/'      // 生成目录
 
 //压缩css
gulp.task('cssMin', function(){
  return gulp.src(cssSrc)   //压缩的文件
    .pipe(rename({suffix: ''}))  
    .pipe(minifyCss()) //执行压缩
    .pipe(gulp.dest('css'));  //输出文件夹
});
//为css中引入的图片/字体等添加hash编码
gulp.task('assetRev', function(){
  return gulp.src(cssSrc)  //该任务针对的文件
   .pipe(assetRev()) //该任务调用的模块
   .pipe(gulp.dest('css')); //编译后的路径
});
 
//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
  return gulp.src(cssSrc)
    .pipe(rev())
    .pipe(rev.manifest({
         "advanced": false,
         "compatibility": "ie7"
    }))
    .pipe(gulp.dest('rev/css'));
});
 //压缩js
gulp.task('uglify',function(){
  return gulp.src(jsSrc)
   .pipe(rename({suffix: ''}))
   .pipe(uglify())
   .pipe(gulp.dest('minJs'));
});
 
//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
  return gulp.src(jsSrc)
    .pipe(rev())
    .pipe(rev.manifest())
    .pipe(gulp.dest('rev/js'));
});
 
 
//Html替换css、js文件版本
gulp.task('revHtml', function () {
  return gulp.src(['rev/**/*.json', '*.html'])
    .pipe(revCollector())
    .pipe(gulp.dest(''));
});
 
 
//开发构建
gulp.task('default', function (done) {
  condition = false;
  runSequence(    //需要说明的是，用gulp.run也可以实现以上所有任务的执行，只是gulp.run是最大限度的并行执行这些任务，而在添加版本号时需要串行执行（顺序执行）这些任务，故使用了runSequence.
    ['cssMin'],
    ['assetRev'],
    ['revCss'],
    ['uglify'],
    ['revJs'],
    ['revHtml'],
    done);
});

// 模版合并
gulp.task('ejs', function(){
    gulp.src(tplDir + '/**/*.html')
        .pipe(data(function (file) {

            var filePath = file.path;

            // global.json 全局数据，页面中直接通过属性名调用
            return Object.assign(JSON.parse(fs.readFileSync(tplDir + '/global.json')), {
                // local: 每个页面对应的数据，页面中通过 local.属性 调用
                local: JSON.parse(fs.readFileSync( path.join(path.dirname(filePath), path.basename(filePath, '.html') + '.json')))
            }) 
        }))
        .pipe(ejs().on('error', function(err) {
            gutil.log(err);
            this.emit('end');
        }))
        .pipe(gulp.dest(distDir));
});

gulp.task('ejs-watch', ['ejs'], browserSync.reload);

// 开发服务
gulp.task('dev', function() {

    browserSync.init({
        server: {
            baseDir: distDir
        },
        reloadDebounce: 0
    });

    // 无论是数据文件更改还是模版更改都会触发页面自动重载
    gulp.watch(tplDir + '/**/*.*', ['ejs-watch']);

});