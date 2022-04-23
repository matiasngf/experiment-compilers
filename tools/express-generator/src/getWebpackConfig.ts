import path from 'path';
import { Configuration } from "webpack";
import VirtualModulesPlugin from "webpack-virtual-modules";
import { generateAppCode } from "./getAppCode";
import { GenerateMode } from "./handleGenerateAsync";
import nodeExternals from "webpack-node-externals";
import { parseAppRoutes } from './parseAppRoutes';
import chalk from 'chalk';

export const generateWebackConfig = (pathList: string[], mode: GenerateMode, outputPath: string) => {
  // parse routes
  const routes = parseAppRoutes(pathList);
  console.log(chalk.green(`parsed ${routes.length} routes`));
  routes.forEach(route => {
    console.log(chalk.green(`route: ${route.routeUrl} -> file: ${route.importPath}`));
  });
  // create virtual-modules
  const appCode = generateAppCode(routes);
  const virtualModules = new VirtualModulesPlugin({
    './.virtual/index.js': appCode.index,
    './.virtual/project-routes.js': appCode.routes
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
    entry: './.virtual/index.js',
    plugins: [
      virtualModules
    ]
  };
  return config;
}