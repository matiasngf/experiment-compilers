import fs from 'fs'
import path from 'path'

import image from './50px.jpg'

function loadImage(imgSrc) {
  return fs.readFileSync(path.join(__dirname, imgSrc));
}
console.log('############ IMAGE SOURCE:');
console.log(image);

console.log('############ IMAGE BUFFER:');
console.log(
  loadImage(image)
);