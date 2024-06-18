const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: './react/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
        title: 'OpenWeather API Demo Project',
        template: 'react/index.html'
    }),
    new MiniCssExtractPlugin({
        filename: 'bundle.css',
    }),
  ],

  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 4000,
    proxy: [
      {
        context: ['/weather'],
        target: 'http://localhost:3000',
      },
      {
        context: ['/forecast'],
        target: 'http://localhost:3000',
      },
    ],
  },

  performance: {
    maxAssetSize: 9500000,
    maxEntrypointSize: 9500000,
  }
};