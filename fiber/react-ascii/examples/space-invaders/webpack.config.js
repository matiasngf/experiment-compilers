const path = require("path");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV == "production";

const plugins = []

if (isProduction) {
  plugins.push(new ForkTsCheckerWebpackPlugin())
}

plugins.push(new webpack.ProvidePlugin({
  React: 'react'
}))

module.exports = {
  mode: isProduction ? "production" : "development",
  devtool: "source-map",
  entry: path.join(__dirname, "src", "index.tsx"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    clean: true
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(jsx?)|(tsx?)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "swc-loader",
          options: {
            sourceMap: true,
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: path.resolve(__dirname, 'loaders/buffer-loader.js'),
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    fallback: {
      fs: false
    },
  },
  plugins
}