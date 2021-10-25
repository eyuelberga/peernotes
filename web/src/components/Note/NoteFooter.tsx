import React from 'react';
import { Stack, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { NoteFooterProps } from './props';

const NoteFooter: React.FC<NoteFooterProps> = () => {
  return (
    <Stack p={10} spacing={8} align="center">
      <Stack align="center" spacing={2}>
        <Heading
          textTransform="uppercase"
          textAlign="center"
          fontSize="3xl"
          color={useColorModeValue('gray.800', 'gray.200')}
        >
          Did you enjoy this note?
        </Heading>
        <Text fontSize="lg" color="gray.500">
          Show recognition to the student by liking this note. you can also add
          it to your reading list
        </Text>
      </Stack>
    </Stack>
  );
};

export default NoteFooter;
