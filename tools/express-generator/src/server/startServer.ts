import express from 'express';
import { config } from 'dotenv';

export interface RouteHandler {
  (req: express.Request, res: express.Response): void;
}

export interface ProjectRoutes {
  [routeUrl: string]: {
    GET: RouteHandler,
    POST: RouteHandler,
    PATCH: RouteHandler,
    PUT: RouteHandler,
    DELETE: RouteHandler,
  };
}

export const startServer = (projectRoutes: ProjectRoutes) => {
  const app = express();

  config();
  const port = process.env.PORT || 3000;
  
  const router = express.Router();
  
  Object.entries(projectRoutes).forEach(([route, handlers]) => {
    if(typeof handlers.GET === 'function') {
      router.get(route, handlers.GET);
    }
    if(typeof handlers.POST === 'function') {
      router.post(route, handlers.POST);
    }
    if(typeof handlers.PATCH === 'function') {
      router.patch(route, handlers.PUT);
    }
    if(typeof handlers.PUT === 'function') {
      router.put(route, handlers.PUT);
    }
    if(typeof handlers.DELETE === 'function') {
      router.delete(route, handlers.DELETE);
    }
  });
  
  app.use(router);
  
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}