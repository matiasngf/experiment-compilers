# image-loader
This simple script shows how you can manipulate the imported files in your webpack build.

The `image-loader.js` gets the path from the image and returns a base64 string.

## How to create a basic loader

Bascially, you could write a file that contains:
```js
// my-basic-loader.js
module.exports = function (content) {
  console.log('The original imported content:', content);
  return 'module.exports = "Hello World!"';
}
```
And use it in webpack:
```js
// webpack.config
const path = require("path");
module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  module: {
    rules: [
      {
        test: /\.(jpg)|(png)$/,
        use: {
          loader: path.resolve('my-basic-loader.js'),
        }
      }
    ]
  },
}
```

Now, every time you import an file ended in .png or .jpg, you will get the string "Hello World!":
```js
// index.js
import logo from './logo.png';

console.log(logo === 'Hello World!'); // true
```

## More how-tos

### Getting the path from the imported file
```js
// npm i loader-utils
const { urlToRequest } = require('loader-utils');

module.exports = function () {
  const urlRequest = urlToRequest(this.resourcePath);
  return `module.exports = ${JSON.stringify(urlRequest)}`;
}
```

### Getting options from the loader
```js
// npm i schema-utils
const { validate } = require('schema-utils');

// Define a schema for the options
const schema = {
  type: 'object',
  properties: {
    name: {
      description: 'Your name',
      type: 'string',
      default: 'world'
    }
  },
};

module.exports = function () {
  // Get the options
  const options = this.getOptions();
  // Validate the options
  validate(schema, options, {
    name: 'Example Loader',
    baseDataPath: 'options',
  });
  const name = options.name;
  return `module.exports = "Hello ${name}!"`; // (This is unsafe)
}
```

### Emit a file
```js
const path = require('path');
module.exports = function (content) {
  const filename = path.basename(this.resourcePath)

  // Build asset info
  const assetInfo = {
    sourceFilename: filename
  }
  // Emit the file to dist
  this.emitFile(filename, content, null, assetInfo);
}
```

## A more advanced example
[loader-structure](../loader-structure)

## Useful links:
- How to write a loader: https://webpack.js.org/contribute/writing-a-loader/
- Loader API: https://webpack.js.org/api/loaders
- A real file-loader: https://github.com/webpack-contrib/file-loader/blob/master/src/index.js
- A curated list of resources: https://webpack.js.org/awesome-webpack/
- More loaders: https://github.com/orgs/webpack-contrib/repositories