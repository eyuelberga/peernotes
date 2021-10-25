import { lazy } from 'react';
import { RouteConfigSpec } from '../../../interfaces';
import { PLATFORM_MODERATOR_PATH, MANAGE } from '../../../config/constants';

const manage = lazy(() => import('./manage'));

const routes: RouteConfigSpec[] = [
  {
    path: `${PLATFORM_MODERATOR_PATH}/${MANAGE}`,
    component: manage,
    exact: false,
  },
];
export default routes;
