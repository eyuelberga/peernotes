import React from 'react';
import {
  Avatar,
  Box,
  Text,
  Stack,
  IconButton,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SchoolItemProps } from './props';

const SchoolItem: React.FC<SchoolItemProps> = ({
  location,
  name,
  picture,
  onSelect,
  smallFont,
  action: Action,
}) => {
  const SchoolBody = (
    <Box
      rounded="lg"
      borderWidth="1px"
      borderRadius="lg"
      p={smallFont ? 2 : 4}
      onClick={onSelect}
      role="listitem"
    >
      <Flex>
        <Avatar
          size={smallFont ? 'sm' : 'md'}
          src={picture}
          name={name}
          alt="School logo"
        />
        <Stack
          direction="column"
          spacing={0}
          fontSize={smallFont ? 'xs' : 'sm'}
          mx={2}
        >
          <Text noOfLines={1} fontWeight={600}>
            {name}
          </Text>
        </Stack>
        <Spacer />
        <Stack direction="row">
          {onSelect && (
            <IconButton
              rounded="lg"
              colorScheme="blue"
              aria-label="connect"
              onClick={onSelect}
              icon={<FontAwesomeIcon icon="plus" />}
            />
          )}

          {Action}
        </Stack>
      </Flex>
    </Box>
  );
  return SchoolBody;
};
export default SchoolItem;
