/**
 * @file electron 编译配置
 * @author leon <ludafa@outlook.com>
 */

const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        main: path.join(__dirname, '../src/main/app.js')
    },
    output: {
        path: path.join(__dirname, '../output/main'),
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
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    resolve: {
        extensions: [
            '',
            '.js'
        ]
    },

    // Make web variables accessible to webpack, e.g. window
    target: 'electron',
    progress: true
};
