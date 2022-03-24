import { validate } from 'schema-utils';

import schema from './options.json';
import parse from './parse';
import { translateTokens } from './translateTokens';
import { mergeTokens } from './utils';

export const raw = false;

/**
 *
 * @param {string|Buffer} content Content of the resource file
 * @param {object} [map] SourceMap data consumable by https://github.com/mozilla/source-map
 * @param {any} [meta] Meta data, could be anything
 */
export default function loader(source) {
  const { version, webpack } = this;

  const options = this.getOptions();

  validate(schema, options, {
    name: 'TranslateJs Loader',
    baseDataPath: 'options',
  });
  
  const { keywords } = options;

  const parsedCode = parse(source, keywords);
  const translatedTokens = translateTokens(parsedCode, keywords);
  const translatedSource = mergeTokens(translatedTokens);

  const newSource = `
  /**
   * Loader API Version: ${version}
   * Is this in "webpack mode": ${webpack}
   */
  ${translatedSource}`;

  return `${newSource}`;
}