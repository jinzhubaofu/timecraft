/**
 * @file gulpfile
 * @author leon <ludafa@outlook.com>
 */

const gulp = require('gulp');
const webpack = require('webpack');
const gutil = require('gulp-util');
const mainConf = require('./tools/webpack.main.js');
const rendererConf = require('./tools/webpack.renderer.js');

gulp.task('main', () => {

    webpack(mainConf, (error, stats) => {

        if (error) {
            throw new gutil.PluginError('webpack', error);
        }

        gutil.log(`[webpack] ${stats.toString()}`);

    });

});

gulp.task('renderer', callback => {

    webpack(rendererConf, (error, stats) => {

        if (error) {
            throw new gutil.PluginError('webpack', error);
        }

        gutil.log(`[webpack] ${stats.toString()}`);

    });

});


gulp.task('default', ['renderer', 'main']);
