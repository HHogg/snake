const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './src/client.js',
  },
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
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
      ],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
    }),
  ],
};
