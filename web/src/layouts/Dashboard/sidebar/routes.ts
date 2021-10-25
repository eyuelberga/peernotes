import {
  RiBookLine,
  RiBookmarkLine,
  RiHomeLine,
  RiSettingsLine,
} from 'react-icons/ri';
import {
  MANAGE,
  FEED,
  NOTES_PATH,
  APP_PATH,
  ME_PATH,
  PROFILE,
  READING_LIST,
} from '../../../config/constants';

export const topRoutes = [
  { name: 'Home', to: `${APP_PATH}/${FEED}`, icon: RiHomeLine },
  { name: 'My Notes', to: `${NOTES_PATH}/${MANAGE}`, icon: RiBookLine },
  {
    name: 'Reading List',
    to: `${NOTES_PATH}/${READING_LIST}`,
    icon: RiBookmarkLine,
  },
  { name: 'Profile', to: `${ME_PATH}/${PROFILE}`, icon: RiSettingsLine },
];

export const routes = [];
