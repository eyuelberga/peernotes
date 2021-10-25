import React from 'react';
import { Stack } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import NoteDisplay from './NoteDisplay';
import EmptyPlaceholder from '../lib/EmptyPlaceholder';
import NoteDisplaySkeleton from './NoteDisplaySkeleton';
import { alert } from '../../utils';
import { NoteListProps } from './props';
import AsyncRender from '../lib/AsyncRender';
import { NOTES_PATH, UPDATE, DETAIL } from '../../config/constants';

const NoteList: React.FC<NoteListProps> = ({
  loading,
  data,
  error,
  header: Header,
  footer: Footer,
  hideUserInfo,
  isEditable,
  isPreview,
  onRemove,
  from,
  hideDetails,
  smallFont,
}) => {
  const Notes = () => {
    const history = useHistory();
    const onEdit = (id: string) => {
      if (isEditable) {
        return () => {
          history.push(`${NOTES_PATH}/${UPDATE}?id=${id}`);
        };
      }
      return undefined;
    };
    const addFrom = from ? `?from=${from}` : '';
    const link = (id: string) => {
      return `${NOTES_PATH}/${DETAIL}/${id}${addFrom}`;
    };
    const onPreview = (id: string) => {
      if (isPreview) {
        return () => {
          history.push(link(id));
        };
      }
      return undefined;
    };
    const onRemoveInternal = (id: string) => {
      if (onRemove) {
        return () => {
          onRemove(id);
        };
      }
      return undefined;
    };
    return (
      <>
        {Header}
        {data?.map(
          ({
            id,
            title,
            subject,
            topic,
            updatedAt,
            likes,
            createdBy,
            description,
            views,
            gradeLevel,
            label,
          }) => (
            <NoteDisplay
              link={isPreview ? undefined : link(id)}
              smallFont={smallFont}
              hideUserInfo={hideUserInfo}
              label={label}
              id={id}
              key={id}
              title={title}
              subject={subject}
              topic={topic}
              gradeLevel={gradeLevel}
              updatedAt={updatedAt}
              likes={likes}
              views={views}
              createdBy={createdBy}
              description={!hideDetails ? description : undefined}
              onEdit={onEdit(id)}
              onPreview={onPreview(id)}
              onRemove={onRemoveInternal(id)}
            />
          ),
        )}
        {Footer}
      </>
    );
  };
  const displayNotes = () => {
    if (data?.length) {
      return Notes();
    }
    return undefined;
  };
  return (
    <Stack spacing={4} id="NoteList">
      <AsyncRender
        loading={loading}
        skeleton={[1, 2, 3, 4].map((x) => (
          <NoteDisplaySkeleton key={x} />
        ))}
        data={displayNotes()}
        alert={alert(error)}
        fallback={
          <EmptyPlaceholder icon="exclamation-circle" title="No Notes Found" />
        }
      />
    </Stack>
  );
};

export default NoteList;
