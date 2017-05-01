var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path:  path.join(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
   module: {
    rules: [
      {
        test: /\.scss$/,
      //  use: ['style-loader', 'css-loader', 'sass-loader']
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: '/dist'
        })
      },
      {
          test: /\.js$/,
          exclude: /node_modules/,
          use:'babel-loader'
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