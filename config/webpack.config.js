'use strict'

module.exports = require('./get-webpack-config')({
    reactHot: true,
    devtool: 'inline-source-map',
    uglify: false,
    extractCss: true,
    minify: true
})