import { lazy } from 'react';
import { RouteConfigSpec } from '../../../interfaces';
import { ME_PATH, PROFILE, NOTIFICATION } from '../../../config/constants';

const profile = lazy(() => import('./profile'));
const notification = lazy(() => import('./notification'));

const routes: RouteConfigSpec[] = [
  {
    path: `${ME_PATH}/${PROFILE}`,
    component: profile,
    exact: false,
  },
  {
    path: `${ME_PATH}/${NOTIFICATION}`,
    component: notification,
    exact: false,
  },
];
export default routes;
