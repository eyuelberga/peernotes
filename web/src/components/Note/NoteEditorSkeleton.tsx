import React from 'react';
import { Box, Skeleton, Stack } from '@chakra-ui/react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const NoteEditorSkeleton = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="white" h={400}>
      <Skeleton height="30px" my="2" width="50vw" />
      <Skeleton height="60px" my="2" width="50vw" />
      <Stack direction="row" my="2">
        <Skeleton height="30px" width="12vw" />
        <Skeleton height="30px" width="12vw" />
        <Skeleton height="30px" width="12vw" />
      </Stack>
      <Skeleton height="200px" my="2" width="50vw" />
    </Box>
  );
};
export default NoteEditorSkeleton;
