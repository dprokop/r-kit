'use strict'

var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var path = require('path')

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        singleRun: true,
        frameworks: ['jasmine'],
        files: [
            'webpack.tests.config.js'
        ],
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-sourcemap-loader',
            'karma-webpack'
        ],
        preprocessors: {
            'webpack.tests.config.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots'],
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader?presets[]=react,presets[]=es2015!eslint-loader?fix'
                    },
                    {
                        test: require.resolve('react'),
                        loader: 'expose?React'
                    }
                ]
            },
        },
        webpackMiddleware: {
            noInfo: true
        }
    })
}