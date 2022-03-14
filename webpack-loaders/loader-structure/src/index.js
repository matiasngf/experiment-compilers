import { urlToRequest } from 'loader-utils';
import { validate } from 'schema-utils';

import schema from './options.json';

export const raw = true;

export default function loader(_source) {
  const { version, webpack } = this;

  const options = this.getOptions();

  validate(schema, options, {
    name: 'Image Loader',
    baseDataPath: 'options',
  });

  const urlRequest = urlToRequest(this.resourcePath)

  const esModule = typeof options.esModule !== 'undefined' ? options.esModule : true;
  const exportCode = `${
    esModule ? 'export default' : 'module.exports ='
  } ${JSON.stringify(urlRequest)}`

  const newSource = `
  /**
   * Loader API Version: ${version}
   * Is this in "webpack mode": ${webpack}
   */
  /**
   * Exports
   */
  ${exportCode}`;

  return `${newSource}`;
}