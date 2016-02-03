'use strict';

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = {
    DEV: 'development',
    PROD: 'production'
}

var defaultOptions = {
    env: process.env.NODE_ENV,
    autoprefixerBrowsers: ['last 2 versions']
}

module.exports = function (options) {

    var settings = Object.assign({}, defaultOptions, options);
    var stylesETP = new ExtractTextPlugin('main.css', {allChunks: true});
    var vendorStylesETP = new ExtractTextPlugin('vendors.css', {allChunks: true});


    var jsLoaders = [
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            loader: settings.reactHot ? 'react-hot-loader!babel-loader?presets[]=react,presets[]=es2015!eslint-loader?fix=true' : 'babel-loader?presets[]=react,presets[]=es2015!eslint-loader'
        },
        {
            test: require.resolve('react'), loader: 'expose?React'
        },
        {
            test: require.resolve('react-dom'), loader: 'expose?ReactDOM'
        }
    ]

    var styleLoaders = [
        {
            test: /main.scss$/,
            loader: settings.env === env.DEV ? 'style-loader!css-loader?sourceMap&importLoaders=1!postcss-loader!sass-loader?sourceMap' : stylesETP.extract('style-loader', 'css-loader?minimize&importLoaders=1!postcss-loader!sass-loader'),
        },
        {
            test: /(node_modules)*\.(css)$/,
            loader: settings.env === env.DEV ? 'style-loader!css-loader' : vendorStylesETP.extract('style-loader', 'css-loader?minimize'),
        },
    ]

    var plugins = (settings.env === env.DEV ? [] : [stylesETP, vendorStylesETP])

    if(settings.uglify) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            mangle: {
                except: settings.uglifyMangleExcept ? settings.uglifyMangleExcept : []
            }
        }));
    }

    return {
        entry: {
            client: 'index.js'
        },

        eslint: {
            configFile: './.eslintrc',
            emitError: true
        },

        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: '[name].bundle.js',
            publicPath: '/dist/'
        },

        devtool: settings.devtool,

        module: {
            loaders: Array.prototype.concat(jsLoaders, styleLoaders),
        },

        resolve: {
            extensions: ['', '.js', '.jsx'],
            root: [path.resolve(__dirname, 'src')]
        },

        postcss: [autoprefixer({browsers: settings.autoprefixerBrowsers})],

        plugins: plugins,
    };
};
