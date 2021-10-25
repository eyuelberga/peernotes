import React from 'react';
import { Stack } from '@chakra-ui/react';
import NotificationDisplay from './NotificationDisplay';
import EmptyPlaceholder from '../lib/EmptyPlaceholder';
import NotificationDisplaySkeleton from './UserItemSkeleton';
import { alert } from '../../utils';
import { NotificationListProps } from './props';
import AsyncRender from '../lib/AsyncRender';

const NotificationList: React.FC<NotificationListProps> = ({
  loading,
  data,
  error,
  header: Header,
  footer: Footer,
  onRead,
  from,
}) => {
  const Notifications = () => {
    const onReadInternal = (id: string) => {
      if (onRead) {
        return () => {
          onRead(id);
        };
      }
      return undefined;
    };
    return (
      <>
        {Header}
        {data?.map(({ id, subject, body, updatedAt }) => (
          <NotificationDisplay
            id={id}
            key={id}
            subject={subject}
            body={body}
            updatedAt={updatedAt}
            onRead={onReadInternal(id)}
          />
        ))}
        {Footer}
      </>
    );
  };
  const displayNotifications = () => {
    if (data?.length) {
      return Notifications();
    }
    return undefined;
  };
  return (
    <Stack spacing={4}>
      <AsyncRender
        loading={loading}
        skeleton={[1, 2, 3, 4].map((x) => (
          <NotificationDisplaySkeleton key={x} />
        ))}
        data={displayNotifications()}
        alert={alert(error)}
        fallback={
          <EmptyPlaceholder
            icon="exclamation-circle"
            title="You have no new notifications"
          />
        }
      />
    </Stack>
  );
};

export default NotificationList;
