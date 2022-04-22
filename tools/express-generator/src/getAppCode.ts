export const generateAppCode = (pathList: string[] ) => {
  return "console.log('hello world')";
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
  console.log(\`⚡️[server]: Server is running at https://localhost:\${port}\`);
});
  `;
  return code;
}