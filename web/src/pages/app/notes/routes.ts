import { lazy } from 'react';
import { RouteConfigSpec } from '../../../interfaces';
import {
  NOTES_PATH,
  DETAIL,
  CREATE,
  UPDATE,
  MANAGE,
  READING_LIST,
  SEARCH,
} from '../../../config/constants';

const detail = lazy(() => import('./detail'));
const manage = lazy(() => import('./manage'));
const create = lazy(() => import('./create'));
const update = lazy(() => import('./update'));
const readingList = lazy(() => import('./reading-list'));
const search = lazy(() => import('./search'));

const routes: RouteConfigSpec[] = [
  {
    path: `${NOTES_PATH}/${READING_LIST}`,
    component: readingList,
    exact: false,
  },
  {
    path: `${NOTES_PATH}/${DETAIL}/:id`,
    component: detail,
    exact: false,
  },
  {
    path: `${NOTES_PATH}/${MANAGE}`,
    component: manage,
    exact: false,
  },
  {
    path: `${NOTES_PATH}/${CREATE}`,
    component: create,
    exact: false,
  },
  {
    path: `${NOTES_PATH}/${UPDATE}`,
    component: update,
    exact: false,
  },
  {
    path: `${NOTES_PATH}/${SEARCH}`,
    component: search,
    exact: false,
  },
];
export default routes;
