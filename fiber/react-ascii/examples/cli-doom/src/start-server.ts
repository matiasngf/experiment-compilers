import net from 'net';
import express from 'express';
import type { Express } from 'express';

const doomApp = `
<html>
  <head>
    <title>Doom</title>
    <script src="https://js-dos.com/cdn/js-dos-api.js"></script>
    <style>
      canvas {
        width: 100%;
        height: 100%;
      }
      body {
        padding: 0;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div style="width: 100vw; height: 100vh; position: relative;">
      <div id="dosbox"></div>
    </div>
    <script type="text/javascript">
        var dosbox = new Dosbox({
        id: "dosbox",
        onload: function (dosbox) {   dosbox.run("https://js-dos.com/cdn/upload/DOOM-@evilution.zip", "./DOOM/DOOM.EXE");
        },
        onrun: function (dosbox, app) {
          console.log("App '" + app + "' is runned");
        }
      });
    </script>
  </body>
</html>
`

export const startServer = (port?: number) => new Promise<[Express, number]>(async (res) => {
  const selectedPort = typeof port === 'number' ? port : await getRandomPort();
  const app = express();

  app.get("/", (_req, res) => {
    res.send(doomApp);
  });

  app.listen(selectedPort, () => {
    res([app, selectedPort]);
  });
});

const checkPortAvailability = (port: number) => {
  const server = net.createServer();

  return new Promise((resolve, reject) => {
    server.once('error', (err) => {
      if ('code' in err && err.code === 'EADDRINUSE') {
        // port is currently in use
        resolve(false);
      } else {
        reject(err);
      }
    });

    server.once('listening', () => {
      server.close();
      resolve(true);
    });

    server.listen(port);
  });
};

const getRandomPort = async () => {

  let found = false;
  let tries = 0;

  while (!found && tries < 100) {
    const port = Math.floor(Math.random() * 2000) + 7000;
    const isAvailable = await checkPortAvailability(port);
    if (isAvailable) {
      found = true;
      return port;
    }
    tries++;
  }

  throw new Error('Could not find an available port. Try again.');

}
