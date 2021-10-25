import React, { useState, useRef, useContext } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, useHistory } from 'react-router-dom';
import { loader } from 'graphql.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteDisplay from '../../../components/Note/NoteDisplay';
import NoteDisplaySkeleton from '../../../components/Note/NoteDisplaySkeleton';
import EmptyPlaceholder from '../../../components/lib/EmptyPlaceholder';
import SubNavigation from '../../../components/lib/SubNavigation';
import { alert, toastifyError } from '../../../utils';
import AsyncRender from '../../../components/lib/AsyncRender';
import NoteReport from '../../../components/Note/NoteReport';
import { NOTES_PATH, UPDATE, MANAGE } from '../../../config/constants';
import { useQuery as useURLQuery } from '../../../hooks';
import { mapNoteRequest } from './utils';
import { UserMetaContext } from '../../../contexts';

const GET_NOTE = loader('../../../queries/notes/detail.gql');
const VIEW_NOTE = loader('../../../queries/notes/view.gql');
const LIKE_NOTE = loader('../../../queries/notes/like.gql');
const UNLIKE_NOTE = loader('../../../queries/notes/unlike.gql');
const BOOKMARK_NOTE = loader('../../../queries/notes/add-reading-list.gql');
const UNBOOKMARK_NOTE = loader(
  '../../../queries/notes/remove-reading-list.gql',
);

const Detail: React.FC<Record<string, never>> = () => {
  const { username } = useContext(UserMetaContext);
  const paramRef = useRef(useParams<{ id: string }>());
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const queryRef = useRef(useURLQuery());
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [note, setNote] = useState<any>(null);
  const [from, setFrom] = useState('');

  const viewNoteRef = useRef(
    useMutation(VIEW_NOTE, {
      onError: (e) => {
        if (e?.graphQLErrors[0]?.extensions?.code !== 'constraint-violation') {
          toastifyError(e);
        }
      },
    }),
  );

  const [like, { loading: likeLoading }] = useMutation(LIKE_NOTE, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: () => {
      setLiked(true);
    },
  });
  const [unLike, { loading: unlikeLoading }] = useMutation(UNLIKE_NOTE, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: () => {
      setLiked(false);
    },
  });

  const [bookmark, { loading: bookmarkLoading }] = useMutation(BOOKMARK_NOTE, {
    onError: (e) => {
      toastifyError(e);
    },
    onCompleted: () => {
      setBookmarked(true);
    },
  });
  const [unBookmark, { loading: unbookmarkLoading }] = useMutation(
    UNBOOKMARK_NOTE,
    {
      onError: (e) => {
        toastifyError(e);
      },
      onCompleted: () => {
        setBookmarked(false);
      },
    },
  );
  const { error, loading } = useQuery(GET_NOTE, {
    variables: {
      id: paramRef.current.id,
      username,
    },
    onCompleted: ({
      note: n,
      isLiked: isLikedObj,
      isBookmarked: isBookmarkedObj,
    }) => {
      const mapped = mapNoteRequest(n);
      setNote(mapped);
      setLiked(isLikedObj.aggregate.count > 0);
      setBookmarked(isBookmarkedObj.aggregate.count > 0);
      window.scrollTo({ top: 0 });
      const queryFrom = queryRef.current.get('from');
      if (queryFrom) setFrom(queryFrom);
      if (mapped?.published && mapped?.createdBy?.username !== username) {
        viewNoteRef.current[0]({
          variables: { id: paramRef.current.id },
        });
      }
    },
  });

  // useEffect(() => {
  //   window.scrollTo({ top: 0 });
  //   const queryFrom = queryRef.current.get('from');
  //   if (queryFrom) setFrom(queryFrom);
  //   viewNoteRef.current[0]({
  //     variables: { id: paramRef.current.id },
  //   });
  // }, []);
  const likeNote = () => {
    if (!from.includes(MANAGE)) {
      return () => {
        if (liked) {
          unLike({ variables: { id: paramRef.current.id, username } });
        } else {
          like({ variables: { id: paramRef.current.id } });
        }
      };
    }
    return undefined;
  };
  const bookmarkNote = () => {
    if (!from.includes(MANAGE)) {
      return () => {
        if (bookmarked) {
          unBookmark({ variables: { id: paramRef.current.id, username } });
        } else {
          bookmark({ variables: { id: paramRef.current.id } });
        }
      };
    }
    return undefined;
  };
  const reportNote = () => {
    if (!from.includes(MANAGE)) {
      return () => {
        onOpen();
      };
    }
    return undefined;
  };
  const DataDisplay = () => {
    return (
      <>
        <NoteReport
          id={paramRef.current.id}
          onClose={onClose}
          isOpen={isOpen}
          onOpen={onOpen}
        />
        <NoteDisplay
          isLoading={
            likeLoading || unlikeLoading || bookmarkLoading || unbookmarkLoading
          }
          id={note.id}
          isLiked={liked}
          isBookmarked={bookmarked}
          title={note.title}
          subject={note.subject}
          topic={note.topic}
          gradeLevel={note.gradeLevel}
          updatedAt={note.updatedAt}
          likes={note.likes}
          views={note.views}
          createdBy={note.createdBy}
          description={note.description}
          content={note.content}
          onLike={likeNote()}
          onBookmark={bookmarkNote()}
          onReport={reportNote()}
        />
      </>
    );
  };
  const displayData = () => {
    if (note) {
      return DataDisplay();
    }
    return undefined;
  };
  return (
    <>
      <SubNavigation
        goBack
        title={note?.title}
        action={
          from === MANAGE && (
            <Button
              leftIcon={<FontAwesomeIcon icon="edit" />}
              onClick={() => {
                history.push(
                  `${NOTES_PATH}/${UPDATE}?id=${paramRef.current.id}`,
                );
              }}
            >
              Edit
            </Button>
          )
        }
      />
      <AsyncRender
        loading={loading}
        skeleton={<NoteDisplaySkeleton isDetailed />}
        data={displayData()}
        alert={alert(error)}
        fallback={
          <EmptyPlaceholder icon="exclamation-circle" title="No Note Found" />
        }
      />
    </>
  );
};
export default Detail;
