/* eslint-disable no-useless-escape */
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

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
              keywords: {
                'function': '🤖',
                'return': '👈',
                'if': '🤔',
                'true': '👍',
                'false': '👎',
                'else': '🤷🏼‍♂️',
                'throw': '🔥',
                'console\.log': '📣',
                'typeof': '🦴',
                'const': '💾'
              }
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