import React, { useState, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Stack, Grid, GridItem, Box, Spinner } from '@chakra-ui/react';
import { loader } from 'graphql.macro';
import { useQuery, useLazyQuery } from '@apollo/client';
import NoteList from '../../components/Note/NoteList';
import ListHeader from '../../components/lib/ListHeader';
import CallToAction from '../../components/Home/CallToAction';
import DashboardLayout from '../../layouts/Dashboard';
import {
  NOTES_PATH,
  READING_LIST,
  FEED,
  FETCH_LIMIT as limit,
} from '../../config/constants';
import { UserMetaContext } from '../../contexts';
import { mapNotesRequest, mapReadingListRequest } from './notes/utils';
import { toastifyError } from '../../utils';

const GET_FEED = loader('../../queries/users/feed.gql');
const MORE_NOTES = loader('../../queries/notes/feed.gql');

const Feed = () => {
  const { username, gradeLevel, subjects } = useContext(UserMetaContext);
  const [notes, setNotes] = useState<any[]>([]);
  const [mostEngaging, setMostEngaging] = useState<any[]>([]);
  const [readingList, setReadingList] = useState<any[]>([]);
  const [totalLeft, setTotalLeft] = useState(0);
  const [initialNoteFetch, setInitialNoteFetch] = useState(0);
  const { error, loading } = useQuery(GET_FEED, {
    fetchPolicy: 'network-only',
    variables: { username, grade_level: gradeLevel, subjects },
    onCompleted: ({
      notes: ns,
      readingList: rl,
      mostEngaging: ens,
      total: t,
    }) => {
      const fetchedNotes = [...(ns as any[]).map(mapNotesRequest)];
      setNotes(fetchedNotes);
      setInitialNoteFetch(fetchedNotes.length);
      setReadingList(rl.map(mapReadingListRequest));
      setMostEngaging([...(ens as any[]).map(mapNotesRequest)]);
      setTotalLeft(t.aggregate.count - fetchedNotes.length);
    },
  });
  const [more, { loading: moreLoading }] = useLazyQuery(MORE_NOTES, {
    fetchPolicy: 'network-only',
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
    const cursor = notes[notes.length ? notes.length - 1 : 0]?.updatedAt;
    if (cursor) {
      more({
        variables: {
          limit,
          username,
          grade_level: gradeLevel,
          subjects,
          cursor,
        },
      });
    }
  };

  return (
    <DashboardLayout>
      <Stack>
        <CallToAction
          title={!loading ? 'Latest Notes ' : ' '}
          body={!loading ? 'for you' : ' '}
          description={
            !loading
              ? 'Notes published by other students who are taking the same subjects as you'
              : undefined
          }
        />
        <Grid
          templateColumns={{
            md: `repeat(${
              readingList.length || mostEngaging.length ? '6' : '1'
            }, 1fr)`,
            base: 'repeat(1, 1fr)',
          }}
          gap={4}
        >
          <GridItem colSpan={4}>
            <InfiniteScroll
              dataLength={notes.length}
              endMessage={
                notes.length ? (
                  <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                  </p>
                ) : undefined
              }
              next={loadMore}
              hasMore={totalLeft > initialNoteFetch}
              loader={
                moreLoading ? (
                  <Box mx="auto">
                    <Spinner size="sm" />
                  </Box>
                ) : undefined
              }
            >
              <NoteList
                error={error}
                from={FEED}
                loading={loading}
                data={notes}
              />
            </InfiniteScroll>
          </GridItem>

          <GridItem colSpan={2} display={['none', '', 'flex']}>
            <Stack>
              {readingList.length > 0 && (
                <NoteList
                  hideDetails
                  smallFont
                  error={error}
                  loading={loading}
                  data={readingList}
                  from={READING_LIST}
                  header={
                    <ListHeader
                      title="Reading List"
                      linkPath={`${NOTES_PATH}/${READING_LIST}`}
                      linkName="See All"
                    />
                  }
                />
              )}
              {mostEngaging.length > 0 && (
                <NoteList
                  hideDetails
                  smallFont
                  error={error}
                  loading={loading}
                  data={mostEngaging}
                  header={<ListHeader title="Notes you may like" />}
                />
              )}
            </Stack>
          </GridItem>
        </Grid>
      </Stack>
    </DashboardLayout>
  );
};

export default Feed;
