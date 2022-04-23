const path = require("path");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const nodeExternals = require("webpack-node-externals");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { ProvidePlugin } = require("webpack");

const webpack = require('webpack');

const config = {
  entry: path.join(__dirname, "src", "index.ts"),
  target: "node",
  externalsPresets: { node: true },
  externals: [nodeExternals({
    allowlist: (modulePath) => {
      return !([
        "webpack",
        "webpack-virtual-modules",
        "webpack-node-externals",
        "handlebars",
        "express"
      ].includes(modulePath));
    }
  })],
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist"),
    libraryTarget: "umd",
    globalObject: "this"
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)|(tsx?)$/,
        exclude: /(node_modules|bower_components)/,
        use: ["babel-loader", "ts-loader"]
      },
      {
        test: /\.hbs$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: path.resolve('handlebars-loader.js'),
        }
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/,
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "./dist")],
    }),
    new ProvidePlugin({
      "Handlebars": "handlebars",
    })
  ]
}

// Fix issues with importing unsupported fsevents module in Windows and Linux
// For more info, see: https://github.com/vinceau/project-clippi/issues/48
if (process.platform !== "darwin") {
  config.plugins.push(
    new webpack.IgnorePlugin({
      resourceRegExp: /^fsevents$/,
    })
  );
}

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  if (isProduction) {
    config.mode = "production";
    config.devtool = "source-map";
  } else {
    config.mode = "development";
    config.devtool = "cheap-module-source-map";
  }

  return config;
};