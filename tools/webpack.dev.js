/**
* @file webpack dev config
* @author leon <ludafa@outlook.com>
*/

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const {host, port} = require('./conf');

module.exports = {

    target: 'electron-renderer',

    entry: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://${host}:${port}`,
        'webpack/hot/only-dev-server',
        path.join(__dirname, '../src/renderer/main.js')
    ],

    // Don't use hashes in dev mode for better performance
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },


    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.styl$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'stylus-loader',
                            options: {
                                'resolve url': true,
                                'include css': true,
                                'paths': ['node_modules'],
                                'use': [
                                    require('nib')()
                                ],
                                'import': ['~nib/lib/nib/index.styl']
                            }
                        }
                    ]

                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.md$/,
                loader: 'text-loader'
            }
        ]
    },
    plugins: [

        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('../asset/inf.manifest.json')
        }),

        new ExtractTextPlugin('style.css'),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/renderer/index.html')
        }),

        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, '../asset/inf.js')
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.NamedModulesPlugin(),

        new webpack.NoEmitOnErrorsPlugin()

    ],

    // Emit a source map for easier debugging
    devtool: 'inline-source-map',

    devServer: {
        host,
        port,
        historyApiFallback: true,
        hot: true,
        stats: {
            children: false
        }
    },

    stats: {
        children: false
    }

};
