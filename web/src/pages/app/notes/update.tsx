import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import NoteEditor from '../../../components/Note/NoteEditor';
import NoteDisplaySkeleton from '../../../components/Note/NoteDisplaySkeleton';
import EmptyPlaceholder from '../../../components/lib/EmptyPlaceholder';
import SubNavigation from '../../../components/lib/SubNavigation';
import { Note } from '../../../interfaces';
import { alert, toastifyError } from '../../../utils';
import AsyncRender from '../../../components/lib/AsyncRender';
import { useQuery as useURLQuery } from '../../../hooks';
import { mapNoteRequestForUpdate } from './utils';

const GET_NOTE = loader('../../../queries/notes/detail-for-update.gql');
const UPDATE_NOTE = loader('../../../queries/notes/update.gql');

const Update: React.FC<Record<string, never>> = () => {
  const queryRef = useRef(useURLQuery());
  const [id, setId] = useState('');
  const [note, setNote] = useState<Note | undefined>();
  const [isPublished, setIsPublished] = useState(false);
  const { error, loading } = useQuery(GET_NOTE, {
    fetchPolicy: 'network-only',
    variables: {
      id,
    },
    onCompleted: ({ note: n }) => {
      const mapped = mapNoteRequestForUpdate(n);
      setNote(mapped);
      setIsPublished(mapped.published);
    },
  });
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const queryId = queryRef.current.get('id');
    if (queryId) setId(queryId);
  }, []);
  const [update, { loading: updateLoading }] = useMutation(UPDATE_NOTE, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: ({ note: n }) => {
      const { id: newId, published } = n;
      setId(newId);
      if (published) {
        setIsPublished(true);
      }
    },
  });
  const save = () => {
    if (!isPublished && id) {
      return ({ title, description, topic, content }: Note) => {
        update({
          variables: {
            id,
            title,
            description,
            content,
            topic_id: topic.id,
            published: false,
          },
        });
      };
    }
    return undefined;
  };
  const saveAndPublish = () => {
    if (id) {
      return ({ title, description, topic, content }: Note) => {
        update({
          variables: {
            id,
            title,
            description,
            content,
            topic_id: topic.id,
            published: true,
          },
        });
      };
    }
    return undefined;
  };
  const displayData = () => {
    if (id && note) {
      return (
        <NoteEditor
          isLoading={updateLoading}
          content={note.content}
          title={note.title}
          description={note.description}
          topic={note.topic}
          onSave={save()}
          onPublish={saveAndPublish()}
        />
      );
    }
    return undefined;
  };
  return (
    <>
      <SubNavigation goBack title="Update note" />
      <AsyncRender
        loading={loading}
        skeleton={<NoteDisplaySkeleton isDetailed />}
        data={displayData()}
        alert={alert(error)}
        fallback={
          <EmptyPlaceholder icon="exclamation-circle" title="No Items Found" />
        }
      />
    </>
  );
};
export default Update;
