/**
 * @file webpack base config
 * @author leon <ludafa@outlook.com>
 */

const path = require('path');
const webpack = require('webpack');

// PostCSS plugins
const cssnext = require('postcss-cssnext');
const postcssFocus = require('postcss-focus');
const postcssReporter = require('postcss-reporter');

module.exports = function (options) {

    return {
        entry: options.entry,
        output: Object.assign(
            // Compile into js/build.js
            {
                path: path.join(__dirname, '../asset'),
                publicPath: '/'
            },
            // Merge with env dependent settings
            options.output
        ),
        module: {
            loaders: [{
                test: /\.js$/, // Transform all .js files required somewhere with Babel
                loaders: [
                    'react-hot',
                    'babel'
                ],
                exclude: /node_modules/
                // query: options.babelQuery
            }, {
                // Transform our own .css files with PostCSS and CSS-modules
                test: /\.css$/,
                exclude: /node_modules/,
                loader: options.cssLoaders
            }, {
                // Do not transform vendor's CSS with CSS-modules
                // The point is that they remain in global scope.
                // Since we require these CSS files in our JS or CSS files,
                // they will be a part of our compilation either way.
                // So, no need for ExtractTextPlugin here.
                test: /\.css$/,
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader']
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader'
            }, {
                test: /\.md$/,
                loader: 'text-loader'
            }, {
                test: /\.(jpg|png|gif)$/,
                loaders: [
                    'file-loader'
                ]
            }, {
                test: /\.html$/,
                loader: 'html-loader'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            }, {
                test: /\.(mp4|webm)$/,
                loader: 'url-loader?limit=10000'
            }]
        },
        plugins: [
            ...options.plugins,
            // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
            // inside your code for any environment checks; UglifyJS will automatically
            // drop any unreachable code.
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                }
            })
        ],
        postcss() {
            return [

                // Add a :focus to every :hover
                postcssFocus(),

                // Allow future CSS features to be used, also auto-prefixes the CSS...
                cssnext({
                    // ...based on this browser list
                    browsers: ['last 2 versions', 'IE > 10']
                }),
                // Posts messages from plugins to the terminal
                postcssReporter({
                    clearMessages: true
                }),
                require('postcss-css-reset')()
            ];
        },
        resolve: {
            modules: ['public', 'node_modules'],
            extensions: [
                '',
                '.js'
            ],
            mainFields: [
                'jsnext:main',
                'main'
            ]
        },
        devtool: options.devtool,
        target: 'web', // Make web variables accessible to webpack, e.g. window
        stats: false, // Don't show stats in the console
        progress: true
    };

};