const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/static.js',
  ],
  output: {
    filename: 'assets/snake-heuristics.[hash].min.js',
    path: path.resolve(__dirname, 'static'),
    publicPath: '/',
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
    new UglifyJSPlugin({
      uglifyOptions: {
        ecma: 6,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '\'production\'',
      },
    }),
    new StaticSiteGeneratorPlugin({
      paths: [
        '/',
        '/about',
        '/leaderboard',
      ],
    }),
    new CopyWebpackPlugin([{
      from: './src/assets',
      to: './assets',
    }]),
  ],
};
