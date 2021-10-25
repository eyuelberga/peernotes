/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Icon,
  FlexProps,
} from '@chakra-ui/react';

import { FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { NOTES_PATH, SEARCH } from '../../../config/constants';

const Search = (props: FlexProps) => {
  const history = useHistory();
  const [query, setQuery] = useState('');
  return (
    <Flex {...props}>
      <InputGroup>
        <InputLeftElement h="full" pointerEvents="none">
          <Icon as={FiSearch} color="blue.600" fontSize="lg" />
        </InputLeftElement>
        <Input
          type="text"
          role="search"
          placeholder="Search for notes..."
          fontSize="sm"
          onChange={(e) => {
            const val = e.target.value;
            setQuery(val);
          }}
          onKeyPress={({ key }) => {
            if (key === 'Enter')
              history.push(`${NOTES_PATH}/${SEARCH}?q=${query}`);
          }}
        />
      </InputGroup>
    </Flex>
  );
};

export default Search;
