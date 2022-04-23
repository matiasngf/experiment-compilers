import generateIndex from './generators/generateIndex.hbs';
import generateRouter from './generators/generateRoutes.hbs';

export const generateAppCode = (pathList: string[] ) => {
  const routes = [];
  pathList.forEach(path => {
    const routeUrl = path.replaceAll(/\\/g, '/');
    const importPath = path.replaceAll(/\\/g, '/');
    routes.push({
      routeUrl,
      importPath
    })
  })
  return {
    index: generateIndex(),
    routes: generateRouter({routes})
  }
}