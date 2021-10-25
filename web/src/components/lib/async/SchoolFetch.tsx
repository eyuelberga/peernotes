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
import { SchoolFetchProps, BasicSchoolInfo } from '../props';
import EmptyPlaceholder from '../EmptyPlaceholder';
import SchoolItem from '../SchoolItem';
import { toastifyError } from '../../../utils';
import { UserMetaContext } from '../../../contexts';

const SEARCH_SCHOOL = loader('../../../queries/users/search-school.gql');

const SchoolFetch: React.FC<SchoolFetchProps> = ({ onSelect, isDisabled }) => {
  const { username } = useContext(UserMetaContext);
  const query = SEARCH_SCHOOL;
  const [searchQuery, setSearchQuery] = useState('');
  const [schools, setSchools] = useState<BasicSchoolInfo[]>([]);
  const [showEmpty, setShowEmpty] = useState(false);

  const [fetchRemote, { loading }] = useLazyQuery(query, {
    onError: (e) => {
      toastifyError(e);
      setShowEmpty(false);
    },
    onCompleted: ({ schools: s }) => {
      if (!s.length) {
        setShowEmpty(true);
      } else {
        setSchools([...s]);
        setShowEmpty(false);
      }
    },
  });
  const clear = () => {
    setSchools([]);
    setSearchQuery('');
    setShowEmpty(false);
  };
  const fetch = (q: string) => {
    if (q && q.length > 2) {
      fetchRemote({ variables: { query: `%${q}%` } });
    } else {
      setSchools([]);
    }
  };
  return (
    <Box borderWidth="1px" borderRadius="lg">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FontAwesomeIcon icon="search" />
        </InputLeftElement>
        <Input
          id="SchoolFetch_Query"
          isDisabled={isDisabled}
          variant="flushed"
          mb={2}
          value={searchQuery}
          placeholder="Search for school"
          onKeyPress={({ key }) => {
            if (key === 'Enter') fetch(searchQuery);
          }}
          onChange={(e) => {
            const val = e.target.value;
            if (val && val.length < 2) {
              setShowEmpty(false);
            }
            if (val.length > 2) {
              fetch(val);
            }
            setSearchQuery(val);
          }}
        />
        <InputRightElement>
          <IconButton
            id="SchoolFetch_Search"
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
        {schools.map(({ name, picture, location }) => (
          <SchoolItem
            key={name}
            name={name}
            picture={picture}
            location={location}
            smallFont
            onSelect={() => {
              if (onSelect) onSelect({ name, picture, location });
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default SchoolFetch;
