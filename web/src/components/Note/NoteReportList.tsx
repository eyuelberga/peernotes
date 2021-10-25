import React from 'react';
import { Stack } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import NoteReportDisplay from './NoteReportDisplay';
import EmptyPlaceholder from '../lib/EmptyPlaceholder';
import NoteReportDisplaySkeleton from './NoteDisplaySkeleton';
import { alert } from '../../utils';
import { NoteReportListProps } from './props';
import AsyncRender from '../lib/AsyncRender';
import { NOTES_PATH, UPDATE, DETAIL } from '../../config/constants';

const NoteReportList: React.FC<NoteReportListProps> = ({
  loading,
  data,
  error,
  header: Header,
  footer: Footer,
  hideUserInfo,
  isEditable,
  isPreview,
  onRemove,
  onReject,
  onAccept,
  from,
  hideDetails,
  smallFont,
}) => {
  const NoteReports = () => {
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
    const onRejectInternal = (id: string, username: string) => {
      if (onReject) {
        return () => {
          onReject(id, username);
        };
      }
      return undefined;
    };
    const onAcceptInternal = (id: string, username: string) => {
      if (onAccept) {
        return () => {
          onAccept(id, username);
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
            content,
            views,
            gradeLevel,
            label,
            report,
            username,
          }) => (
            <NoteReportDisplay
              username={username}
              smallFont={smallFont}
              hideUserInfo={hideUserInfo}
              label={label}
              id={id}
              key={id}
              content={content}
              title={title}
              subject={subject}
              topic={topic}
              gradeLevel={gradeLevel}
              updatedAt={updatedAt}
              likes={likes}
              views={views}
              createdBy={createdBy}
              description={!hideDetails ? description : undefined}
              report={report}
              onEdit={onEdit(id)}
              onPreview={onPreview(id)}
              onRemove={onRemoveInternal(id)}
              onReject={onRejectInternal(id, username)}
              onAccept={onAcceptInternal(id, username)}
            />
          ),
        )}
        {Footer}
      </>
    );
  };
  const displayNoteReports = () => {
    if (data?.length) {
      return NoteReports();
    }
    return undefined;
  };
  return (
    <Stack spacing={4}>
      <AsyncRender
        loading={loading}
        skeleton={[1].map((x) => (
          <NoteReportDisplaySkeleton key={x} />
        ))}
        data={displayNoteReports()}
        alert={alert(error)}
        fallback={
          <EmptyPlaceholder icon="exclamation-circle" title="No Items Found" />
        }
      />
    </Stack>
  );
};

export default NoteReportList;
