import React, { useState, useContext } from 'react';
import {
  Input,
  Box,
  IconButton,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Progress,
  Stack,
} from '@chakra-ui/react';
import { loader } from 'graphql.macro';
import { useLazyQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StudentFetchProps } from '../props';
import { BasicStudentInfo } from '../../interfaces';
import EmptyPlaceholder from '../EmptyPlaceholder';
import UserItem from '../../User/UserItem';
import { toastifyError } from '../../../utils';
import { UserMetaContext } from '../../../contexts';

const SEARCH_USER = loader('../../../queries/users/search-all.gql');
const SEARCH_USER_FROM_CONNECTION = loader(
  '../../../queries/users/search-connections.gql',
);
const StudentFetch: React.FC<StudentFetchProps> = ({
  onSelect,
  isDisabled,
  fromConnectionOnly,
}) => {
  const { username } = useContext(UserMetaContext);
  const query = fromConnectionOnly ? SEARCH_USER_FROM_CONNECTION : SEARCH_USER;
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<BasicStudentInfo[]>([]);
  const [showEmpty, setShowEmpty] = useState(false);

  const [fetchRemote, { loading }] = useLazyQuery(query, {
    onError: (e) => {
      toastifyError(e);
      setShowEmpty(false);
    },
    onCompleted: ({ users }) => {
      if (!users.length) {
        setShowEmpty(true);
      } else {
        setStudents([...users]);
        setShowEmpty(false);
      }
    },
  });
  const clear = () => {
    setStudents([]);
    setSearchQuery('');
    setShowEmpty(false);
  };
  const fetch = (q: string) => {
    if (q && q.length > 2) {
      fetchRemote({ variables: { query: `%${q}%`, username } });
    } else {
      setStudents([]);
    }
  };
  return (
    <Box borderWidth="1px" borderRadius="lg">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FontAwesomeIcon icon="search" />
        </InputLeftElement>
        <Input
          id="StudentFetch_Query"
          isDisabled={isDisabled}
          variant="flushed"
          mb={2}
          value={searchQuery}
          placeholder="Search for student"
          onKeyPress={({ key }) => {
            if (key === 'Enter') fetch(searchQuery);
          }}
          onChange={(e) => {
            const val = e.target.value;
            if (val && val.length < 2) {
              setShowEmpty(false);
            }
            setSearchQuery(val);
          }}
        />
        <InputRightElement>
          <IconButton
            id="StudentFetch_Search"
            isDisabled={isDisabled}
            size="sm"
            aria-label="search"
            onClick={() => {
              fetch(searchQuery);
            }}
            icon={<FontAwesomeIcon icon="arrow-right" />}
          />
        </InputRightElement>
      </InputGroup>
      {loading && <Progress isIndeterminate h={2} />}
      <Stack>
        {showEmpty && (
          <EmptyPlaceholder
            title="No result found"
            description="No students found matching your query"
            icon="exclamation-circle"
          />
        )}
        {students.map(
          ({
            fullname,
            profilePicture,
            username: uname,
            school,
            gradeLevel,
          }) => (
            <UserItem
              key={uname}
              fullname={fullname}
              profilePicture={profilePicture}
              username={uname}
              school={school}
              gradeLevel={gradeLevel}
              smallFont
              action={
                onSelect ? (
                  <IconButton
                    id="StudentFetch_Action"
                    isDisabled={isDisabled}
                    ml={1}
                    aria-label="select"
                    size="sm"
                    onClick={() => {
                      onSelect({
                        fullname,
                        profilePicture,
                        username: uname,
                        school,
                        gradeLevel,
                      });
                      clear();
                    }}
                    icon={
                      <FontAwesomeIcon
                        icon={fromConnectionOnly ? 'plus' : 'paper-plane'}
                      />
                    }
                  />
                ) : undefined
              }
            />
          ),
        )}
      </Stack>
    </Box>
  );
};

export default StudentFetch;
