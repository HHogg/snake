const webpack = require('webpack');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 4002;

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server',
    './src/client.js',
  ],
  output: {
    filename: 'snake-heuristics.js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader'],
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
    }),
  ],
  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    host: 'localhost',
    hot: true,
    port,
  },
};
