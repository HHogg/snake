const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

module.exports = {
  entry: './src/static.js',
  output: {
    filename: 'assets/snake-heuristics.[hash].min.js',
    path: 'static',
    publicPath: '/snake-heuristics',
    libraryTarget: 'umd',
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
    }, {
      test: /\.ejs$/,
      use: ['ejs-loader'],
    }],
  },
  plugins: [
    new CleanWebpackPlugin(['static']),
    new ExtractTextPlugin({
      allChunks: true,
      filename: 'assets/snake-heuristics.[hash].min.css',
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\'production\'',
      },
    }),
    new StaticSiteGeneratorPlugin('main'),
    new OfflinePlugin({
      publicPath: '/snake-heuristics',
    }),
  ],
};
