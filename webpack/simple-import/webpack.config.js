const path = require('path');

const config = {
  devtool: false,
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
}

module.exports = config