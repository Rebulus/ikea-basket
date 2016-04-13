var fs = require('fs');
var dir = require('path').resolve.bind(null, process.cwd());
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var babelLoader = {
    test: /\.jsx?$/,
    include: [
        dir('cfgs'),
        dir('client'),
        dir('helpers'),
        dir('server')
    ],
    loader: 'babel',
    query: { 'presets': ['react', 'es2015'] }
};

var jadeLoader = {
    test: /\.jade$/,
    include: [
        dir('server')
    ],
    loader: 'jade'
};

var cssLoader = [
    { 
        test: /\.css$/,
        include: [
            dir('client'),
            dir('node_modules/bootstrap')
        ],
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    },
    {
        test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader : 'file'
    }
];

var IS_DEV = process.argv[2] === '-d';

// Minify React with excluding warnings
var minifyReactPlugins = IS_DEV ? [] : [
    new webpack.DefinePlugin({
        'process.env':{
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress:{
            warnings: true
        }
    })
];

module.exports = [
    // Browser build
    {
        entry: './client/index.js',
        output: {
            filename: 'client.js',
            path: dir('dist')
        },
        module: {
            loaders: [ babelLoader ].concat(cssLoader)
        },
        plugins: [
            // Create separate css file
            new ExtractTextPlugin("client.css")
        ].concat(minifyReactPlugins)
    },
    // Server build
    {
        target: 'node',
        entry: './server/index.js',
        output: {
            filename: 'server.js',
            path: dir('dist'),
            libraryTarget: 'commonjs'
        },
        module: {
            loaders: [ babelLoader, jadeLoader ].concat(cssLoader)
        },
        externals: [
            {
                'express': true,
                'xml2json': true,
                'body-parser': true,
                'request': true
            }
        ],
        plugins: minifyReactPlugins
    }
];
