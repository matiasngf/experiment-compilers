import fs from 'fs';
import del from 'del'
import webpack from 'webpack';
import { generateWebackConfig } from './getWebpackConfig';

const generatedDir = '.express-generator';

export type GenerateMode = 'development' | 'production';

export const handleGenerate = (pathList: string[], mode: GenerateMode, callback?: Function) => {
  // Delete previous generated files
  if (!fs.existsSync(generatedDir)) {
      fs.mkdirSync(generatedDir);
  }
  del.sync(`${generatedDir}/**`);
  
  // Compile webpack
  const config = generateWebackConfig(pathList, mode, generatedDir);
  
  webpack(config, (err, stats) => {
    if (err) {
      console.error(err);
      return;
    }
    if(stats?.compilation?.errors && stats?.compilation?.errors.length > 0) {
      stats.compilation.errors.forEach(error => {
        console.error(error.message);
      });
    } else {
      if(callback) callback();
    }
  })
}

export const handleGenerateAsync = (pathList: string[], mode: GenerateMode) => {
  return new Promise<void>((resolve, reject) => {
    handleGenerate(pathList, mode, (error: any) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    })
  })
}