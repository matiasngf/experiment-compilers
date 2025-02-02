const fs = require('fs')

module.exports = function (source) {
  console.log(source);
  return `module.exports = Buffer.from(${JSON.stringify(Array.from(source))})`
}

module.exports.raw = true