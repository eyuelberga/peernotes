import React, { useState, useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import NoteList from '../../../components/Note/NoteList';
import SubNavigation from '../../../components/lib/SubNavigation';
import NavMenu from '../../../components/lib/NavMenu';
import actions from './nav_actions';
import { READING_LIST, FETCH_LIMIT as limit } from '../../../config/constants';
import { mapReadingListRequest } from './utils';
import { toastifyError } from '../../../utils';
import { UserMetaContext } from '../../../contexts';

const GET_READING_LIST_BY_USER = loader(
  '../../../queries/notes/reading-list.gql',
);
const REMOVE_FROM_READING_LIST = loader(
  '../../../queries/notes/remove-reading-list.gql',
);
const Feed: React.FC<Record<string, never>> = () => {
  const { username } = useContext(UserMetaContext);
  const [notes, setNotes] = useState<any[]>([]);
  const [totalLeft, setTotalLeft] = useState(0);
  const { error, loading } = useQuery(GET_READING_LIST_BY_USER, {
    fetchPolicy: 'network-only',
    variables: {
      username,
      limit,
    },
    onCompleted: ({ notes: ns, total: t }) => {
      const fetchedNotes = [...(ns as any[]).map(mapReadingListRequest)];
      setNotes(fetchedNotes);
      setTotalLeft(t.aggregate.count - fetchedNotes.length);
    },
  });
  const [more, { loading: moreLoading }] = useLazyQuery(
    GET_READING_LIST_BY_USER,
    {
      onError: (e) => {
        toastifyError(e);
      },
      onCompleted: ({ notes: moreNs }) => {
        const moreNotes = (moreNs as any[]).map(mapReadingListRequest);
        setTotalLeft(totalLeft - moreNotes.length);
        setNotes([...notes, ...moreNotes]);
      },
    },
  );
  const [remove, { loading: removeLoading }] = useMutation(
    REMOVE_FROM_READING_LIST,
    {
      onError: (e) => {
        toastifyError(e);
      },
      onCompleted: ({ note }) => {
        const { id: deletedId } = note;
        setNotes(
          notes.filter(({ id }) => {
            return id !== deletedId;
          }),
        );
      },
    },
  );
  const onRemove = (id: string) => {
    remove({ variables: { id, username } });
  };
  const loadMore = () => {
    more({
      variables: {
        username,
        limit,
        cursor: notes[notes.length ? notes.length - 1 : 0].bookmarkedAt,
      },
    });
  };
  return (
    <>
      <SubNavigation
        goBack
        title="Reading List"
        action={<NavMenu actions={actions} />}
      />
      <NoteList
        isPreview
        error={error}
        from={READING_LIST}
        loading={loading || removeLoading}
        data={notes}
        onRemove={onRemove}
        footer={
          <Button
            isDisabled={totalLeft <= 0}
            colorScheme="blue"
            variant="link"
            onClick={loadMore}
            isLoading={moreLoading}
          >
            Load more...
          </Button>
        }
      />
    </>
  );
};

export default Feed;
