const path = require("path");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');
const ShebangPlugin = require('./webpack/shebang-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const plugins = []

if (isDevelopment) {
  // plugins.push(new webpack.HotModuleReplacementPlugin({
  //   // Don't attempt to show errors in browser
  //   overlay: false,
  // }))
  // plugins.push(new ReactRefreshWebpackPlugin({
  //   library: "example",
  //   overlay: {
  //     sockIntegration: 'wds',
  //     sockHost: 'localhost',
  //     sockPort: 3000,
  //     useURLPolyfill: true,
  //   },
  // }))
} else {
  // prod build
  plugins.push(new ForkTsCheckerWebpackPlugin())
}

plugins.push(new webpack.ProvidePlugin({
  React: 'react',
}))

plugins.push(new ShebangPlugin())

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: !isDevelopment ? "production" : "development",
  devtool: !isDevelopment ? false : "source-map",
  target: 'node',
  externalsPresets: { node: true },
  entry: path.join(__dirname, "src", "index.tsx"),

  // devServer: {
  //   historyApiFallback: true,
  //   allowedHosts: "all",
  //   hot: true,
  //   client: true,
  //   port: 3000,
  //   static: {
  //     directory: path.join(__dirname, 'public'),
  //     publicPath: 'http://localhost:3000/',
  //   },
  //   client: {
  //     overlay: false,
  //     webSocketURL: 'ws://localhost:3000/ws',
  //   },
  //   devMiddleware: {
  //     writeToDisk: true,
  //   },

  // },
  output: {
    path: path.join(__dirname, "dist"),
    filename: 'bundle.js',
    clean: true,
    publicPath: 'http://localhost:3000/',
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(jsx?)|(tsx?)$/,
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src'),
        // use: 'babel-loader',
        use: {
          loader: "swc-loader",
          options: {
            sourceMap: true,
            jsc: {
              transform: {
                react: {
                  runtime: 'automatic',
                  development: isDevelopment,
                  // refresh: isDevelopment,
                },
              },
            },
          },
        },

      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: path.resolve(__dirname, 'webpack/buffer-loader.js'),
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