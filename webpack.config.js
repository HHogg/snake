const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: 'snake-heuristics.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new OfflinePlugin(),
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader?importLoaders=1',
        'postcss-loader?sourceMap=inline',
      ],
    }],
  },
};
