import React, { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { loader } from 'graphql.macro';
import NoteList from '../../../../components/Note/NoteList';
import { FETCH_LIMIT as limit } from '../../../../config/constants';
import { mapNotesRequest } from '../../notes/utils';
import { toastifyError } from '../../../../utils';
import { SubPageProps } from '../../../../interfaces';

const GET_PUBLISHED_NOTES_BY_USER = loader(
  '../../../../queries/notes/published.gql',
);

const Default: React.FC<SubPageProps> = ({ username }) => {
  const [notes, setNotes] = useState<any[]>([]);
  const [totalLeft, setTotalLeft] = useState(0);
  const query = GET_PUBLISHED_NOTES_BY_USER;
  const { error, loading } = useQuery(query, {
    fetchPolicy: 'network-only',
    variables: {
      username,
      limit,
    },
    onCompleted: ({ notes: ns, total: t }) => {
      const fetchedNotes = [...(ns as any[]).map(mapNotesRequest)];
      setNotes(fetchedNotes);
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

  const loadMore = () => {
    more({
      variables: {
        username,
        limit,
        cursor: notes[notes.length ? notes.length - 1 : 0].updatedAt,
      },
    });
  };
  return (
    <>
      <NoteList
        error={error}
        hideUserInfo
        loading={loading}
        data={notes}
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

export default Default;
