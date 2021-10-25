import { lazy } from 'react';
import { RouteConfigSpec } from '../../interfaces';

export const path = '/';
const landing = lazy(() => import('./landing'));
const about = lazy(() => import('./about'));
const routes: RouteConfigSpec[] = [
  { path: `${path}`, component: landing, exact: true },
  { path: `${path}about`, component: about, exact: false },
];
export default routes;
