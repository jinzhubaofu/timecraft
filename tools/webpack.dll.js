/**
 * @file webpack dll configure
 * @author leon <ludafa@outlook.com>
 */

const path = require('path');
const webpack = require('webpack');
const output = path.join(__dirname, '../asset');
const base = require('./webpack.base');

module.exports = base({
    context: process.cwd(),
    target: 'electron-renderer',
    entry: {
        inf: [
            'redux',
            'react-redux',
            'redux-logger',
            'reselect',
            'electron',
            'react',
            'react-dom',
            'lodash',
            'codemirror',
            'react-hot-loader',
            'react-addons-update',
            'markdown-it',
            'codemirror/mode/markdown/markdown',
            'codemirror/lib/codemirror.css',
            'codemirror/theme/monokai.css',
            'classnames',
            'markdown-it-deflist',
            'markdown-it-emoji',
            'markdown-it-footnote',
            'markdown-it-ins',
            'markdown-it-mark',
            'markdown-it-abbr',
            'markdown-it-container',
            'markdown-it-sub',
            'markdown-it-sup',
            'highlight.js',
            'events',
            'markdown-it-anchor'
        ]
    },
    devtool: 'eval-source-map',
    output: {
        filename: '[name].dll.js',
        path: output,
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.join(output, '[name].manifest.json')
        })
    ]
});
