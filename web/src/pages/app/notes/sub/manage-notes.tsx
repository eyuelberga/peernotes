import React, { useState, useContext } from 'react';
import { Button } from '@chakra-ui/react';
import { loader } from 'graphql.macro';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import NoteList from '../../../../components/Note/NoteList';
import StatsCard from '../../../../components/lib/StatsCard';
import { MANAGE, FETCH_LIMIT as limit } from '../../../../config/constants';
import { mapNotesRequest } from '../utils';
import { toastifyError } from '../../../../utils';
import { UserMetaContext } from '../../../../contexts';

const GET_DRAFT_NOTES_BY_USER = loader('../../../../queries/notes/drafts.gql');
const GET_PUBLISHED_NOTES_BY_USER = loader(
  '../../../../queries/notes/published.gql',
);
const REMOVE_NOTE = loader('../../../../queries/notes/remove.gql');

export interface ManageNotesProps {
  published?: boolean;
}

const Manage: React.FC<ManageNotesProps> = ({ published }) => {
  const { username } = useContext(UserMetaContext);
  const [notes, setNotes] = useState<any[]>([]);
  const [totalLeft, setTotalLeft] = useState(0);
  const [total, setTotal] = useState(0);
  const query = published
    ? GET_PUBLISHED_NOTES_BY_USER
    : GET_DRAFT_NOTES_BY_USER;
  const { error, loading } = useQuery(query, {
    fetchPolicy: 'network-only',
    variables: {
      username,
      limit,
    },
    onCompleted: ({ notes: ns, total: t }) => {
      const fetchedNotes = [...(ns as any[]).map(mapNotesRequest)];
      setNotes(fetchedNotes);
      setTotal(t.aggregate.count);
      setTotalLeft(t.aggregate.count - fetchedNotes.length);
    },
  });

  const [more, { loading: moreLoading }] = useLazyQuery(query, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: ({ notes: moreNs }) => {
      const moreNotes = (moreNs as any[]).map(mapNotesRequest);
      setTotalLeft(totalLeft - moreNotes.length);
      setNotes([...notes, ...moreNotes]);
    },
  });
  const [remove, { loading: removeLoading }] = useMutation(REMOVE_NOTE, {
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
      setTotal(total - 1);
    },
  });
  const loadMore = () => {
    more({
      variables: {
        username,
        limit,
        cursor: notes[notes.length ? notes.length - 1 : 0].updatedAt,
      },
    });
  };
  const onRemove = (id: string) => {
    if (window.confirm('Are you sure? this action is permanent')) {
      remove({ variables: { id } });
    }
  };
  return (
    <>
      <StatsCard
        title={published ? 'Total Published Notes' : 'Total Draft Notes'}
        stat={`${total}`}
        description={
          published
            ? 'Notes can be seen by all students'
            : 'Not yet published and can only be seen by you'
        }
        icon={['far', 'file']}
      />

      <NoteList
        error={error}
        hideUserInfo
        isEditable
        isPreview
        from={MANAGE}
        onRemove={onRemove}
        loading={loading || removeLoading}
        data={notes}
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
