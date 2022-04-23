import virtualIndex from './server/virtual-index.generator';

export const generateAppCode = (pathList: string[] ) => {
  console.log(virtualIndex());
  
  return virtualIndex();
  return `
    import express from 'express';
    import { config } from 'dotenv';

    const app = express();

    config();
    const port = process.env.PORT || 3000;

    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    app.get('/routes', (req, res) => {
      res.send(JSON.stringify('${JSON.stringify(pathList)}'))
    })
    app.listen(port, () => {
      console.log(\`⚡️[server]: Server is running at http://localhost:\${port}\`);
    });`;
}