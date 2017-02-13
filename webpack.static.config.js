const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: 'assets/snake-heuristics.[hash].min.js',
    path: 'static',
    publicPath: '/snake-heuristics',
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'postcss-loader',
        ],
      }),
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }],
  },
  plugins: [
    new CleanWebpackPlugin(['static']),
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'assets/snake-heuristics.[hash].min.css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new OfflinePlugin({
      publicPath: '/snake-heuristics',
    }),
  ],
};
