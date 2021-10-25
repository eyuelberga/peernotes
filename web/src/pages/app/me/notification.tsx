import React from 'react';
import Notifications from './sub/notifications';
import SubNavigation from '../../../components/lib/SubNavigation';
import NavMenu from '../../../components/lib/NavMenu';
import actions from './nav_actions';

const Notification: React.FC<Record<string, never>> = () => {
  return (
    <>
      <SubNavigation
        goBack
        title="Notifications"
        action={<NavMenu actions={actions} />}
      />
      <Notifications />
    </>
  );
};

export default Notification;
