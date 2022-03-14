# image-loader
This simple script shows how you can manipulate the imported files in your webpack build.

The `image-loader.js` gets the path from the image and returns a base64 string.

## How to create a basic loader

Bascially, you could write a file that contains:
```js
// image-loader.js
module.exports = function () {
  return 'module.exports = "Hello World!"';
}
```
And use it in webpack:
```js
// webpack.config
{
  module: {
    rules: [
      {
        test: /\.(jpg?)|(png?)$/,
        use: {
          loader: path.resolve('image-loader.js'),
        }
      }
    ]
  },
}
```

And every time you import an image, yo will get the string "Hello World!".<br>
(This is not how a real loader is structured, but a simple example.)

## Useful links:
- How to write a loader: https://webpack.js.org/contribute/writing-a-loader/
- Loader API: https://webpack.js.org/api/loaders
- A real file-loader: https://github.com/webpack-contrib/file-loader/blob/master/src/index.js
- A curated list of resources: https://webpack.js.org/awesome-webpack/
- More loaders: https://github.com/orgs/webpack-contrib/repositories
- https://www.npmjs.com/package/webpack-defaults

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