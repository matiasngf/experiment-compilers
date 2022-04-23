export interface AppRouteParsed {
  routeUrl: string;
  importPath: string;
}

export const parseAppRoutes = (pathList: string[]) => {
  const routes: AppRouteParsed[] = [];
  pathList.forEach(path => {
    let routeUrl = path
      .replaceAll(/\\/g, '/')
      .replace(/^\/routes/, '')
      .replace(/.api.[tj]s$/, '')
      .replace(/\/index$/, '/');
    const importPath = path.replaceAll(/\\/g, '/');
    routes.push({
      routeUrl,
      importPath
    })
  })
  return routes;
}