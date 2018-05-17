const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const vendors = [
    'react',
    'react-dom',
    'jquery'
];

let config = {
    entry: {
        "vendors": vendors,
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: isProduction? 'js/[name].[chunkhash].js' : 'js/[name].js',
        publicPath: '/dist/',
        library: '[name]'
    },
    resolve: {
        alias: {
            'jquery$' : 'jquery/dist/jquery.min.js'
        }
    },
    plugins: [
        new CleanWebpackPlugin(['./dist/js/vendors.*']),
        new AssetsPlugin({
            filename : 'assets.json',
            path : path.join(__dirname,'./dist'),
            update : true
        }),
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
    ]
};

if(isProduction){
    config.plugins = (config.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            }
        })
    ]);
}

module.exports = config;