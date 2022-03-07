/** What this loader do:
 * - Get the image path
 * - Convert the image path to a base64 string (function base64_encode)
 * - Returns the base64 in an "module.exports" variable
 */


const { urlToRequest } = require('loader-utils');
const { validate } = require('schema-utils');

const fs = require('fs');
const path = require('path');

// A util to read the file
function base64_encode(path) {
  var bitmap = fs.readFileSync(path);
  return Buffer.from(bitmap).toString('base64');
}

// Options that can be passed to the loader eg { esModule: false }
const schema = {
  type: 'object',
  properties: {
    esModule: {
      description: "By default, file-loader generates JS modules that use the ES modules syntax.",
      type: "boolean"
    }
  },
};

// Main loader function
module.exports = function () {

  // Get the options from the loader
  const options = this.getOptions();
  validate(schema, options, {
    name: 'Image Loader',
    baseDataPath: 'options',
  });

  const urlRequest = urlToRequest(this.resourcePath)
  const ext = path.extname(urlRequest).replace('.', '');
  const base64Prefix = `data:image/${ext};base64,`
  const base64Content = base64_encode(urlRequest);
  const base64 = base64Prefix + base64Content;

  // This string will be returned when you import Img from './img.png'
  const encodedData = base64;

  // Use the option.esModule to define how to export the final code.
  const esModule =
      typeof options.esModule !== 'undefined' ? options.esModule : true;

  return `${
    esModule ? 'export default' : 'module.exports ='
  } ${JSON.stringify(encodedData)}`;
}