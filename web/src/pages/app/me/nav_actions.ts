import { NavActions } from '../../../interfaces';
import { ME_PATH, PROFILE, NOTIFICATION } from '../../../config/constants';

const actions: NavActions = [
  { to: `${ME_PATH}/${PROFILE}`, name: 'My Profile', icon: 'plus' },
  {
    to: `${ME_PATH}/${NOTIFICATION}`,
    name: 'Notification',
    icon: 'file',
  },
];

export default actions;
