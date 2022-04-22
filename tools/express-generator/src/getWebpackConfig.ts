import path from 'path';
import { Configuration } from "webpack";
import VirtualModulesPlugin from "webpack-virtual-modules";
import { generateAppCode } from "./getAppCode";
import { GenerateMode } from "./handleGenerateAsync";

import { ProvidePlugin } from 'webpack';

export const generateWebackConfig = (pathList: string[], mode: GenerateMode, outputPath: string) => {
  // create virtual-modules
  const appCode = generateAppCode(pathList);
  const virtualModules = new VirtualModulesPlugin({
    './virtual-index.js': appCode,
  });

  const provide = new ProvidePlugin({
    // 'express': 'express',
    // 'dotenv': 'dotenv',
  });

  // run webpack
  const config: Configuration = {
    mode,
    output: {
      path: path.resolve('./dist'),
      filename: 'index.js',
    },
    entry: './virtual-index.js',
    plugins: [
      virtualModules,
      provide
    ]
  };
  return config;
}