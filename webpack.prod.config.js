'use strict';

module.exports = require('./get-webpack-config')({
    devtool: 'hidden-source-map',
    uglify: true
});