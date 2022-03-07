/** What this loader do:
 * - Get the image path
 * - Convert the image path to a base64 string (function base64_encode)
 * - Compress the image
 * - Returns the base64 in an "module.exports" variable
 */


var fs = require('fs');
var path = require('path')
const { urlToRequest } = require('loader-utils');
const { validate } = require('schema-utils');

function base64_encode(path) {
  var bitmap = fs.readFileSync(path);
  return Buffer.from(bitmap).toString('base64');
}

const schema = {
  type: 'object',
  properties: {
    test: {
      type: 'string',
    },
  },
};

module.exports = function () {
  const options = this.getOptions() || {};

  validate(schema, options, {
    name: 'Example Loader',
    baseDataPath: 'options',
  });

  const urlRequest = urlToRequest(this.resourcePath)
  const ext = path.extname(urlRequest).replace('.', '');
  const base64Prefix = `data:image/${ext};base64,`
  const base64Content = base64_encode(urlRequest);
  const base64 = base64Prefix + base64Content;
  const encodedData = base64;

  const esModule =
      typeof options.esModule !== 'undefined' ? options.esModule : true;

  return `${
    esModule ? 'export default' : 'module.exports ='
  } ${JSON.stringify(encodedData)}`;
}