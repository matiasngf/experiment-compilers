import generateIndex from './generators/generateIndex.hbs';
import generateRouter from './generators/generateRoutes.hbs';
import { AppRouteParsed } from './parseAppRoutes';

export const generateAppCode = (routes: AppRouteParsed[] ) => {
  return {
    index: generateIndex(),
    routes: generateRouter({routes})
  }
}