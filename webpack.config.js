'use strict';

module.exports = require('./get-webpack-config')({
    reactHot: true,
    devtool: 'source-map',
    uglify: false
});