'use strict';

var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var stylesETP = new ExtractTextPlugin(1, 'main.css', {allChunks: true});

var plugins = [stylesETP];

var autoprefixerBrowsers = ['last 2 versions']

module.exports = function (options) {

    if(options.uglify) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            mangle: {
                except: [] // add names that you don't want to be mangled
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

        devtool: 'source-map',

        module: {
            loaders: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules)/,
                    loader: 'react-hot-loader!babel-loader?presets[]=react,presets[]=es2015!eslint-loader?fix=true',
                },
                {
                    test: /main.scss$/,
                    loader: stylesETP.extract('style-loader', 'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap&importLoaders=1!postcss-loader!sass-loader?sourceMap'),
                },
                { test: require.resolve('react'), loader: 'expose?React' },
                { test: require.resolve('react-dom'), loader: 'expose?ReactDOM' }
            ],
        },

        resolve: {
            extensions: ['', '.js', '.jsx'],
            root: [path.resolve(__dirname, 'src')]
        },

        postcss: [autoprefixer({browsers: autoprefixerBrowsers})],

        plugins: plugins,
    };
};



