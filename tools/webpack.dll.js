/**
 * @file webpack dll configure
 * @author leon <ludafa@outlook.com>
 */

const path = require('path');
const webpack = require('webpack');
const output = path.join(__dirname, '../asset');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const css = new ExtractTextPlugin({
    filename: '[name].css',
    allChunks: true
});

module.exports = {

    target: 'electron-renderer',

    entry: require('./dll'),

    output: {
        filename: '[name].js',
        path: output,
        library: '[name]'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: css.extract(['css-loader'])
            }
        ]
    },

    devtool: 'source-map',

    plugins: [

        new webpack.DllPlugin({
            name: '[name]',
            path: path.join(output, '[name].manifest.json')
        }),

        css,

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),

        new webpack.NamedModulesPlugin(),

        new webpack.NoEmitOnErrorsPlugin()
    ],
    stats: {
        children: false
    }
};
