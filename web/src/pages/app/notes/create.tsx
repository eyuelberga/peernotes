import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { loader } from 'graphql.macro';
import NoteEditor from '../../../components/Note/NoteEditor';
import SubNavigation from '../../../components/lib/SubNavigation';
import { Note } from '../../../interfaces';
import { toastifyError } from '../../../utils';

const CREATE_NOTE = loader('../../../queries/notes/create.gql');
const UPDATE_NOTE = loader('../../../queries/notes/update.gql');

const Create: React.FC<Record<string, never>> = () => {
  const [id, setId] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [create, { loading: saveLoading }] = useMutation(CREATE_NOTE, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: ({ note }) => {
      const { id: newId } = note;
      setId(newId);
    },
  });
  const [update, { loading: updateLoading }] = useMutation(UPDATE_NOTE, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: ({ note }) => {
      const { id: newId, published } = note;
      setId(newId);
      if (published) {
        setIsPublished(true);
      }
    },
  });
  const save = () => {
    if (!isPublished) {
      if (id) {
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
      return ({ title, description, topic, content }: Note) => {
        create({
          variables: {
            title,
            description,
            content,
            topic_id: topic.id,
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
  return (
    <>
      <SubNavigation goBack title="Create a new Note" />
      <NoteEditor
        isLoading={saveLoading || updateLoading}
        onSave={save()}
        onPublish={saveAndPublish()}
      />
    </>
  );
};
export default Create;
