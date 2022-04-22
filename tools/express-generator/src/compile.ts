// import path from 'path';

import chokidar from 'chokidar';

import chalk from 'chalk';

export const compile = () => {
  const watcher = chokidar.watch('./routes/**.api.ts', {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });

  const pathList: string[] = [];

  watcher
  .on('add', path => {
    pathList.push(path)
  })
  .on('ready', () => {
    watcher.close();
    console.log(pathList);
    console.log(`${chalk.bgYellow('express-gen')} build completed.`);
    // handleGenerateAsync(pathList, 'production').then(() => {
    // })
  })
}