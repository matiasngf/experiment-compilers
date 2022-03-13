import { urlToRequest } from 'loader-utils';
import { validate } from 'schema-utils';

import schema from './options.json';

export const raw = true;

export default function loader(source) {
  const { version, webpack } = this;

  const options = this.getOptions();

  validate(schema, options, {
    name: 'Image Loader',
    baseDataPath: 'options',
  });

  const urlRequest = urlToRequest(this.resourcePath)

  const newSource = `
  /**
   * Loader API Version: ${version}
   * Is this in "webpack mode": ${webpack}
   */
  /**
   * Original Source From Loader
   */
  module.exports = ${JSON.stringify(urlRequest)}`;

  return `${newSource}`;
}