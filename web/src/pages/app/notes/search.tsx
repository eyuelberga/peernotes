/* eslint-disable no-underscore-dangle */

import React, { useState, useEffect, useRef } from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  Checkbox,
  Box,
  Grid,
  GridItem,
  Text,
  Badge,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  InstantSearch,
  connectSearchBox,
  connectHits,
  connectRefinementList,
} from 'react-instantsearch-dom';
import { useQuery as useURLQuery } from '../../../hooks';
import NoteDisplay from '../../../components/Note/NoteDisplay';
import EmptyPlaceholder from '../../../components/lib/EmptyPlaceholder';
import { mapNoteRequest } from './utils';
import { NOTES_PATH, DETAIL } from '../../../config/constants';

const searchClient = algoliasearch(
  (window as any)._env_.REACT_APP_ALGOLIA_APP_ID || '',
  (window as any)._env_.REACT_APP_ALGOLIA_API_KEY || '',
);

const Hit: React.FC<Record<string, any>> = (p) => {
  if (p) {
    const {
      id,
      title,
      subject,
      topic,
      gradeLevel,
      updatedAt,
      createdBy,
      description,
    } = mapNoteRequest(p?.hit);
    return (
      <NoteDisplay
        link={`${NOTES_PATH}/${DETAIL}/${id}?from=search`}
        id={id}
        title={title}
        subject={subject}
        topic={topic}
        gradeLevel={gradeLevel}
        updatedAt={updatedAt}
        createdBy={createdBy}
        description={description}
      />
    );
  }
  return <></>;
};

const MyHits = ({ hits }: Record<string, any>) => (
  <Stack spacing={4}>
    {hits.length < 1 && (
      <EmptyPlaceholder
        icon="exclamation-circle"
        title="Sorry! No Notes Found"
        description="try changing your query"
      />
    )}
    {hits.map((hit: Record<string, any>) => (
      <Hit key={hit.objectID} hit={hit} />
    ))}
  </Stack>
);

const MyRefinementList = ({ items, refine }: Record<string, any>) => (
  <Stack>
    {items.map((item: Record<string, any>) => (
      <Checkbox
        fontWeight={item.isRefined ? 'bold' : undefined}
        key={item.label}
        value={item.isRefined}
        onChange={() => {
          refine(item.value);
        }}
      >
        <Text>
          {item.label}
          <Badge mx={1} colorScheme="blue">
            {item.count}
          </Badge>
        </Text>
      </Checkbox>
    ))}
  </Stack>
);

const CustomHits = connectHits(MyHits);
const CustomRefinementList = connectRefinementList(MyRefinementList);

const MySearchBox = ({ currentRefinement, refine }: Record<string, any>) => (
  <>
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <FontAwesomeIcon icon="search" />
      </InputLeftElement>
      <Input
        id="Note_Search"
        value={currentRefinement}
        onChange={(event) => refine(event.currentTarget.value)}
      />
    </InputGroup>
  </>
);

const CustomSearchBox = connectSearchBox(MySearchBox);

interface RefinementListProps {
  title: string;
  attribute: string;
}
const RefinementList: React.FC<RefinementListProps> = ({
  title,
  attribute,
}) => {
  return (
    <Box p={2} borderWidth="1px">
      <Text fontWeight="bold" mb={1}>
        {title}
      </Text>
      <CustomRefinementList attribute={attribute} />
    </Box>
  );
};

const Default: React.FC<Record<string, never>> = () => {
  const [query, setQuery] = useState('');
  const queryRef = useRef(useURLQuery());
  useEffect(() => {
    const queryFrom = queryRef.current.get('q');
    if (queryFrom) setQuery(queryFrom);
  }, []);
  return (
    <>
      <InstantSearch
        indexName={(window as any)._env_.REACT_APP_ALGOLIA_INDEX || ''}
        searchClient={searchClient}
      >
        <Stack>
          <CustomSearchBox defaultRefinement={query} />
          <Grid
            templateColumns={{ md: 'repeat(6, 1fr)', base: 'repeat(1, 1fr)' }}
            gap={{ md: 4, base: 0 }}
          >
            <GridItem colSpan={2}>
              <Box>
                <Stack direction={{ base: 'row', md: 'column' }} spacing={2}>
                  <RefinementList
                    title="Subjects"
                    attribute="topic.textbook.subject"
                  />
                  <RefinementList
                    title="Grade Levels"
                    attribute="topic.textbook.gradeLevel"
                  />
                </Stack>
              </Box>
            </GridItem>
            <GridItem colSpan={4}>
              <CustomHits />
            </GridItem>
          </Grid>
        </Stack>
      </InstantSearch>
    </>
  );
};
export default Default;
