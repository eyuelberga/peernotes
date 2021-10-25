import { NavActions } from '../../../interfaces';
import {
  NOTES_PATH,
  CREATE,
  MANAGE,
  READING_LIST,
} from '../../../config/constants';

const actions: NavActions = [
  { to: `${NOTES_PATH}/${CREATE}`, name: 'Create Note', icon: 'plus' },
  'divider',
  {
    to: `${NOTES_PATH}/${MANAGE}`,
    name: 'My Notes',
    icon: 'file',
  },
  {
    to: `${NOTES_PATH}/${READING_LIST}`,
    name: 'Reading List',
    icon: 'bookmark',
  },
];

export default actions;
