const path = require("path");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV == "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  devtool: "source-map",
  entry: path.join(__dirname, "src", "index.ts"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
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
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    fallback: {
      fs: false
    },

  },
  plugins: [
    // new ForkTsCheckerWebpackPlugin({}),
    // new webpack.ProvidePlugin({
    //   React: 'react'
    // })
  ]
}