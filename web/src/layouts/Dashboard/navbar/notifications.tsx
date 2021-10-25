import { chakra, IconButton } from '@chakra-ui/react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Notifications = () => {
  return (
    <IconButton
      aria-label="Notifications"
      isRound
      size="sm"
      icon={
        <>
          <FontAwesomeIcon icon="share-square" />
          <chakra.span
            pos="absolute"
            top="-1px"
            right="-1px"
            px={2}
            py={1}
            fontSize="xs"
            fontWeight="bold"
            lineHeight="none"
            color="red.100"
            transform="translate(50%,-50%)"
            bg="red.600"
            rounded="full"
          >
            8
          </chakra.span>
        </>
      }
    />
  );
};

export default Notifications;
