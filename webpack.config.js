var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
     resolve: {
    extensions: [ '.js', '.jsx', '.json']
  },
    module: {
        rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader', 'sass-loader'
                    ],
                    publicPath: '/dist'
                })
            }, {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                //include: [/node_modules\/reactpatientorders/],
                include: [__dirname + "/src/",/node_modules\/reactpatientorders/],
                loader: 'babel-loader',
                query: {
                    presets: ['react']
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                use: 'url-loader?limit=3024&name=fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack 2',
            template: __dirname + '/src/index.html',
            hash: true
        }),
        new ExtractTextPlugin({
            filename: "app.css",
            disable: false,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9090,
        stats: 'errors-only',
        open: true,
        hot: true
    }
}