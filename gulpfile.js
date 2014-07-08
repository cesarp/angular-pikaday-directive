var gulp = require('gulp');
var _ = require('lodash');
var karma = require('karma').server;

var karmaCommonConf = {
    browsers: ['IE'],
    frameworks: ['jasmine'],
    files: [
        'bower_components/angular/angular.min.js',
        'bower_components/moment/min/moment.min.js',
        'bower_components/pikaday/pikaday.js',
        'src/**/*.js',
        'test/**/*-spec.js'
    ]
};

gulp.task('test', function (done) {
    karma.start(_.assign({}, karmaCommonConf, {singleRun: true}), done);
});

gulp.task('default', ['test']);