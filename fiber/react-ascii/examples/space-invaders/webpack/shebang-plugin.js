class ShebangPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tapAsync('ShebangPlugin', (compilation, callback) => {
      const outputPath = compilation.outputOptions.path
      const outputFile = compilation.outputOptions.filename
      const fullPath = require('path').join(outputPath, outputFile)
      const fs = require('fs')

      fs.readFile(fullPath, 'utf8', (err, data) => {
        if (err) return callback(err)

        const shebang = '#!/usr/bin/env node\n'
        if (!data.startsWith(shebang)) {
          fs.writeFile(fullPath, shebang + data, 'utf8', callback)
        } else {
          callback()
        }
      })
    })
  }
}

module.exports = ShebangPlugin