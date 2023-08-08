const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    
  mode: 'production',
  entry: './src/index.js',
  devServer: { 
    historyApiFallback: true,
  },
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    chunkLoadingGlobal: 'myWebpackJsonpCallback',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
    
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        extractComments: true,
        parallel: true,
        terserOptions: {
          ecma: undefined,
          parse: {},
          compress:true,
          mangle: true, // Note mangle.properties is false by default.
          module: false,
          sourceMap: false,
          // Deprecated
          output: null,
          format: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
        },
      }),
    ],
  },
  cache: {
    type: 'filesystem',

  },
  performance: { hints: false },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(webp|png|jpe?g|gif|mp4)$/i,
        type: 'asset/resource'
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ReactRefreshWebpackPlugin(),
    new CompressionPlugin({
      algorithm: "gzip",
    }),
  ],
};