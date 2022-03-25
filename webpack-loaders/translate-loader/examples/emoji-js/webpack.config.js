const path = require("path");

const translateLoader = require('translate-loader')

const isProduction = process.env.NODE_ENV === "production";
const { emojs } = translateLoader.langs

module.exports = {
  mode: isProduction ? "production" : "development",
  devtool: "source-map",
  entry: path.join(__dirname, "src", "index.emojs"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.emojs$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "translate-loader",
            options: {
              keywords: emojs
            }
          }
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  plugins: [],
  target: 'node'
}