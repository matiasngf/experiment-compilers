export const generateAppCode = (pathList: string[] ) => {
  return `
import express from 'express';
const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/routes', (req, res) => {
  res.send(JSON.stringify('${JSON.stringify(pathList)}'))
})
app.listen(port, () => {
  console.log(\`⚡️[server]: Server is running at http://localhost:\${port}\`);
});
  `
  const code = `
import express from 'express';
import { config } from 'dotenv';

config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static('public'));

console.log('detected routes');
console.log('${JSON.stringify(pathList)}');

app.listen(port, () => {
  console.log(\`⚡️[server]: Server is running at localhost:\${port}\`);
});
  `;
  return code;
}