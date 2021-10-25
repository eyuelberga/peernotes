import React, { useState, useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { loader } from 'graphql.macro';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import NotificationList from '../../../../components/User/NotificationList';
import StatsCard from '../../../../components/lib/StatsCard';
import { FETCH_LIMIT as limit } from '../../../../config/constants';
import { mapNotificationsRequest } from '../utils';
import { toastifyError } from '../../../../utils';
import { UserMetaContext } from '../../../../contexts';

const GET_NOTIFICATIONS = loader('../../../../queries/users/notifications.gql');
const MARK_AS_READ = loader('../../../../queries/users/read-notification.gql');

const Manage: React.FC<Record<string, never>> = () => {
  const { username } = useContext(UserMetaContext);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [totalLeft, setTotalLeft] = useState(0);
  const [total, setTotal] = useState(0);
  const query = GET_NOTIFICATIONS;
  const { error, loading } = useQuery(query, {
    fetchPolicy: 'network-only',
    variables: {
      username,
      limit,
    },

    onCompleted: ({ notifications: ns, total: t }) => {
      const fetchedNotifications = [
        ...(ns as any[]).map(mapNotificationsRequest),
      ];

      setNotifications(fetchedNotifications);
      setTotal(t.aggregate.count);
      setTotalLeft(t.aggregate.count - fetchedNotifications.length);
    },
  });

  const [more, { loading: moreLoading }] = useLazyQuery(query, {
    onError: (e) => {
      toastifyError(e);
    },

    onCompleted: ({ notifications: moreNs }) => {
      const moreNotifications = (moreNs as any[]).map(mapNotificationsRequest);
      setTotalLeft(totalLeft - moreNotifications.length);
      setNotifications([...notifications, ...moreNotifications]);
    },
  });
  const [read, { loading: readLoading }] = useMutation(MARK_AS_READ, {
    onError: (e) => {
      toastifyError(e);
    },
  });
  const loadMore = () => {
    more({
      variables: {
        username,
        limit,
        cursor:
          notifications[notifications.length ? notifications.length - 1 : 0]
            .updatedAt,
      },
    });
  };
  const onRead = (id: string) => {
    read({ variables: { id } });
  };
  return (
    <>
      <StatsCard title="Unread Notifications" stat={total} />
      <NotificationList
        error={error}
        onRead={onRead}
        loading={loading}
        data={notifications}
        footer={
          <Button
            isDisabled={totalLeft <= 0}
            colorScheme="blue"
            variant="link"
            onClick={loadMore}
            isLoading={moreLoading}
          >
            Load more..
          </Button>
        }
      />
    </>
  );
};

export default Manage;
