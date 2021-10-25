import { lazy } from 'react';
import { RouteConfigSpec } from '../../interfaces';
import {
  FEED,
  NOTES_PATH,
  USER_PATH,
  APP_PATH,
  GET_STARTED,
  ME_PATH,
  PLATFORM_MODERATOR_PATH,
} from '../../config/constants';

export const path = '/app';
const feed = lazy(() => import('./feed'));
const notes = lazy(() => import('./notes'));
const user = lazy(() => import('./user'));
const me = lazy(() => import('./me'));
const getStarted = lazy(() => import('./get-started'));
const platformModerator = lazy(() => import('./platform-moderator'));
const routes: RouteConfigSpec[] = [
  { path: `${APP_PATH}/${FEED}`, component: feed, exact: false },
  { path: `${NOTES_PATH}`, component: notes, exact: false },
  { path: `${USER_PATH}`, component: user, exact: false },
  { path: `${ME_PATH}`, component: me, exact: false },
  {
    path: `${APP_PATH}/${GET_STARTED}`,
    component: getStarted,
    exact: false,
  },
  {
    path: `${PLATFORM_MODERATOR_PATH}`,
    component: platformModerator,
    exact: false,
  },
];
export default routes;
