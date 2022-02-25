module.exports = {
  entry: {
    bundleName: __dirname + "/src/index.ts", // it will compile as "bundleName.js"
    anotherBundle: __dirname + "/src/anotherEntry.ts", // it will compile as "anotherBundle.js"
  },
  output: {
    path: __dirname + "/dist",
  },
  // this is optional:
  options: {
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: false,
        decorators: true,
        dynamicImport: false
      },
      target: "es5",
      loose: true
    },
    module: {
      type: "commonjs",
    },
    minify: true
  }
};