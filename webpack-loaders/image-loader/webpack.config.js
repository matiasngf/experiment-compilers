const path = require("path");

const isProduction = process.env.NODE_ENV == "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  devtool: "source-map",
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(jpg?)|(png?)$/,
        use: {
          loader: path.resolve('imageLoader.js'),
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  plugins: []
}