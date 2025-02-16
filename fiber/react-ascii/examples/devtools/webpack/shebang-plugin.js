const polyfill = `
var { JSDOM } = require('jsdom')

var dom = new JSDOM('<!doctype html><html><body></body></html>')
var window = dom.window
var self = window
var document = window.document

// Also set globals for non-webpack usage
global.self = self
global.window = window
global.document = document;

var WebSocket = require('ws')

if (typeof window === 'undefined') {
  global.WebSocket = WebSocket
}

var devtools = require('react-devtools-core')

var initializeDevtools = devtools.initialize
var connectToDevTools = devtools.connectToDevTools

initializeDevtools({
  breakOnConsoleErrors: true
});
connectToDevTools();
`

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
          fs.writeFile(fullPath, shebang + polyfill + data, 'utf8', callback)
        } else {
          callback()
        }
      })
    })
  }
}

module.exports = ShebangPlugin