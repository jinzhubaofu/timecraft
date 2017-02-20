/**
 * @file webpack 构建配置
 * @author chenxiao07 <chenxiao07@baidu.com>
 */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');
const postcssReset = require('postcss-css-reset');

const config = {

    target: 'electron-renderer',

    entry: {

        main: [
            path.join(__dirname, '../src/renderer/main.js')
        ],

        // 基础库
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

    output: {
        path: 'output/renderer',
        filename: '[name].[chunkhash:8].js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: [
                    'babel'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    [
                        'css-loader'
                        + '?localIdentName=[local]__[path][name]__[hash:base64:8]'
                        + '&modules&importLoaders=1&sourceMap',
                        'postcss'
                    ]
                )
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(jpg|png|gif)$/,
                loaders: [
                    'file-loader'
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },

    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('[name].[contenthash:8].css'),
        new HtmlWebpackPlugin({
            inject: true,
            templateContent: (function () {

                return fs
                    .readFileSync(
                        path.join(__dirname, '../src/renderer/index.html'),
                        'utf8'
                    )
                    .replace(/<!--@inject:[\w._-]+-->/ig, '');

            })()
        }),
        new webpack.optimize.CommonsChunkPlugin(
            'inf',
            'asset/inf.[chunkhash:8].js'
        ),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ],

    postcss() {
        return [
            postcssFocus(),
            cssnext({
                browsers: ['last 2 versions', 'IE > 10']
            }),
            postcssReporter({
                clearMessages: true
            }),
            postcssReset()
        ];
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: [
            '',
            '.js',
            '.css'
        ]
    }

};


module.exports = config;
