import { lazy } from 'react';
import { RouteConfigSpec } from '../interfaces';
import { path as appPath } from './app/routes';
import { path as homePath } from './home/routes';

const home = lazy(() => import('./home'));
const app = lazy(() => import('./app'));
const routes: RouteConfigSpec[] = [
  { path: homePath, component: home, exact: false },
  { path: appPath, component: app, exact: false },
];
export default routes;
