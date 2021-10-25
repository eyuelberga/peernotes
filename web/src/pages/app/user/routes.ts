import { lazy } from 'react';
import { RouteConfigSpec } from '../../../interfaces';
import { USER_PATH, DETAIL } from '../../../config/constants';

const detail = lazy(() => import('./detail'));
const routes: RouteConfigSpec[] = [
  {
    path: `${USER_PATH}/${DETAIL}/:username`,
    component: detail,
    exact: false,
  },
];
export default routes;
