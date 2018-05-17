
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

let config = {
    //页面入口文件配置
    entry: {
        app: path.join(__dirname, 'client', 'app')
    },
    //入口文件输出配置
    output: {
        path: path.join(__dirname, 'dist'),
        filename: isProduction? 'js/[name].[chunkhash].js' : 'js/[name].js',
        publicPath: '/dist/'
    },
    module: {
        //加载器配置
        rules: [
            {
                include: [path.resolve(__dirname, 'client'),],
                test: /\.js/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets: [['es2015', { modules: false }], 'stage-0', 'react'],
                        plugins: [
                            [
                                'import',
                                {"libraryName": "antd", "libraryDirectory": "es", "style": true}
                            ],
                            ['lodash'],
                            ["transform-runtime"]
                        ]
                    }
                }
            },
            {
                test: /\.(less|css)$/,
                include: [path.resolve(__dirname,'client')],
                use : ExtractTextPlugin.extract({
                    use:[
                        {
                            loader : 'css-loader',
                            options: {
                                modules : true,
                                importLoaders: 2 // Number of loaders applied before CSS loader
                            }
                        },
                        {
                            loader : 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: () => {
                                    let plugins = [require('autoprefixer')()]
                                    if(isProduction) plugins.push(require('cssnano')({
                                        preset: [
                                            "default",
                                            { cssDeclarationSorter: false }     //防止z-index重排
                                        ],
                                    }))
                                    return plugins;
                                }
                            }
                        },
                        {
                            loader :  'less-loader',
                            options : {
                                javascriptEnabled : true    //不加的话引用antd时报错：Inline JavaScript is not enabled
                            }
                        }
                    ]
                })
            },
            {
                test: /\.(less|css)$/,
                exclude: [path.resolve(__dirname,'client')],
                use : ExtractTextPlugin.extract({
                    use:[
                        {
                            loader : 'css-loader',
                            options: {
                                importLoaders: 2 // Number of loaders applied before CSS loader
                            }
                        },
                        {
                            loader : 'postcss-loader',
                            options: {
                                ident: 'postcss',
                                plugins: () => {
                                    let plugins = [require('autoprefixer')()]
                                    if(isProduction) plugins.push(require('cssnano')({
                                        preset: [
                                            "default",
                                            { cssDeclarationSorter: false }     //防止z-index重排
                                        ],
                                    }))
                                    return plugins;
                                }
                            }
                        },
                        {
                            loader :  'less-loader',
                            options : {
                                javascriptEnabled : true    //不加的话引用antd时报错：Inline JavaScript is not enabled
                            }
                        }
                    ]
                })
            },
            { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=8192&name=font/[name].[ext]'},
            { test: /\.(png|jpe?g|gif|svg)$/, loader: 'url-loader?limit=8192&name=img/[name].[ext]'}
        ]
    },
    //插件项
    plugins: [
        new CleanWebpackPlugin(['./dist/js/app.*','./dist/css/app.*']),
        new AssetsPlugin({
            filename : 'assets.json',
            path : path.join(__dirname,'./dist'),
            update : true
        }),
        new ExtractTextPlugin(isProduction? './css/[name].[chunkhash].css' : './css/[name].css'),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json'),
            name: 'vendors',
        })
    ],
    devtool: isProduction? 'cheap-module-source-map' : 'eval-source-map',
    //其它解决方案配置
    resolve: {
        //查找module的话从这里开始查找
        extensions: ['.js', '.jsx', '.less']
    },
    //webpack服务器
    devServer: {
        historyApiFallback: true,//不跳转
        inline: true, //实时刷新,
        disableHostCheck: true, //允许通过ip访问
        proxy: {
            "*": {
                target : 'http://localhost:3002',
                bypass: function(req, res, proxyOptions) {
                    if(/^\/dist\//.test(req.url)){
                        return req.url;
                    }
                }
            }
        }
    }
};
if(isProduction){
    config.plugins = (config.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        })
    ])
}

module.exports = config;