// Based on https://github.com/webpack-contrib/file-loader

import path from 'path';

import { interpolateName } from 'loader-utils';
import { validate } from 'schema-utils';

import schema from './options.json';

// Get the file content as buffer
export const raw = true;

/**
 *
 * @param {string|Buffer} content Content of the resource file
 * @param {object} [map] SourceMap data consumable by https://github.com/mozilla/source-map
 * @param {any} [meta] Meta data, could be anything
 */
export default function loader(content) {
  const { version, webpack } = this;
  const options = this.getOptions();
  validate(schema, options, {
    name: 'Image Loader',
    baseDataPath: 'options',
  });

  /**
   * https://github.com/webpack/loader-utils#interpolatename
   * returns "49cf72aafd1ec2fb.jpg"
   */
  const context = options.context || this.rootContext;
  const name = options.name || '[contenthash].[ext]';
  const interpolatedName = interpolateName(this, name, {
    context,
    content,
    regExp: options.regExp,
  });
  
  // Build the output path
  let outputPath = interpolatedName;
  let filePublicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

  // If the public path is manually setted
  if(options.publicPath) {
    outputPath = path.posix.join(options.publicPath, interpolatedName);
    filePublicPath = path.join(options.publicPath, interpolatedName);
  }

  // Original path in src
  const relativePath = path.relative(this.rootContext, this.resourcePath);
  const normalizedPath = path.normalize(relativePath);

  // Build asset info
  const assetInfo = {
    sourceFilename: normalizedPath
  }

  // Emit the file to dist
  this.emitFile(outputPath, content, null, assetInfo);

  // Build the export code
  const esModule = typeof options.esModule !== 'undefined' ? options.esModule : true;
  const exportCode = `${
    esModule ? 'export default' : 'module.exports ='
  } ${JSON.stringify(filePublicPath)}`

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