import path from 'path';
import { Configuration } from "webpack";
import VirtualModulesPlugin from "webpack-virtual-modules";
import { generateAppCode } from "./getAppCode";
import { GenerateMode } from "./handleGenerateAsync";
import nodeExternals from "webpack-node-externals";

export const generateWebackConfig = (pathList: string[], mode: GenerateMode, outputPath: string) => {
  // create virtual-modules
  const appCode = generateAppCode(pathList);
  const virtualModules = new VirtualModulesPlugin({
    './virtual-index.js': appCode,
  });

  // run webpack
  const config: Configuration = {
    mode,
    target: "node",
    externalsPresets: { node: true },
    externals: [nodeExternals({
      allowlist: (modulePath) => {
        return !([
          "webpack",
          "webpack-virtual-modules",
          "webpack-node-externals",
          "express-generator"
        ].includes(modulePath));
      }
    })],
    output: {
      path: path.resolve('./dist'),
      filename: 'index.js',
    },
    entry: './virtual-index.js',
    plugins: [
      virtualModules
    ]
  };
  return config;
}