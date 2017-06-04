/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const webpack = require('webpack');


module.exports = {
    devtool: 'eval-source-map',
    entry : {
        bundle: [
            'webpack-dev-server/client?http://0.0.0.0:3000',
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            './src/main.js'
        ]},
    output: {
        path    : path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: ['babel-loader', 'eslint-loader'] },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    }
                ]
            },
            {
                test: /\.(less)$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    { 
                        loader: 'css-loader', 
                        options: { 
                            modules: true, 
                            importLoaders: 1, 
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    'less-loader'
                ]
            }        
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title : 'Calendar [DEV Challenge]',
            // inject: true,
            // minify: {
            //     collapseWhiteSpace: true
            // },
            template: './src/index.html'
        }),
        new ProgressBarPlugin({ format: '  Building Offline-first calendar app [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)', clear: false }),
        new webpack.HotModuleReplacementPlugin(),
    ]
};
