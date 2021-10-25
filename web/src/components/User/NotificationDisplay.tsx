import React, { useState } from 'react';
import { chakra, Box, Flex, Text } from '@chakra-ui/react';
import { NotificationDisplayProps } from './props';

const NotificationDisplay: React.FC<NotificationDisplayProps> = ({
  updatedAt,
  subject,
  body,
  onRead,
}) => {
  const [more, setMore] = useState(false);
  return (
    <Box px={8} py={4} rounded="lg" shadow="lg">
      <Flex justifyContent="space-between" alignItems="center">
        <chakra.span fontSize="sm">
          {`${new Date(updatedAt).toDateString()}`}
        </chakra.span>
      </Flex>

      <Box mt={2}>
        <Text
          onClick={() => {
            setMore(true);
            if (onRead && !more) onRead();
          }}
          fontSize="2xl"
          fontWeight="700"
          _hover={{
            textDecor: 'underline',
          }}
        >
          {subject}
        </Text>
        {more && <chakra.p mt={2}>{body}</chakra.p>}
      </Box>
    </Box>
  );
};
export default NotificationDisplay;
