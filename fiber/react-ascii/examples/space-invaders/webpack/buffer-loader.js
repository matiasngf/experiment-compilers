const fs = require('fs')

module.exports = function (source) {
  return `module.exports = Buffer.from(${JSON.stringify(Array.from(source))})`
}

module.exports.raw = true