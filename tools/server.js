/**
 * @file dev server
 * @author leon <ludafa@outlook.com>
 */

const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const port = 8080;
const host = 'http://localhost';

const webpackConfig = require('./webpack.dev.js')({
    port,
    host
});

const app = express();

const compiler = webpack(webpackConfig);

const middleware = webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: webpackConfig.output.publicPath,
    silent: false,
    historyApiFallback: true,
    stats: {
        colors: true
    }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

// Since webpackDevMiddleware uses memory-fs internally to store build
// artifacts, we use it instead
const fs = middleware.fileSystem;

app.get(/\.dll\.js$/, (req, res) => {
    const filename = req.path.replace(/^\//, '');
    res.sendFile(path.join(__dirname, '../asset', filename));
});

app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
        if (err) {
            res.sendStatus(404);
        }
        else {
            res.send(file.toString());
        }
    });
});


app.listen(port, function (err) {

    if (err) {
        console.error(err);
        return;
    }

    console.log(`started: ${host}:${port}`);
});
