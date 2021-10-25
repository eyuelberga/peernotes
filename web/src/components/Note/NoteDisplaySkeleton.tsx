import React from 'react';
import {
  SkeletonText,
  SkeletonCircle,
  Box,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import { NoteDisplaySkeletonProps } from './props';

const NoteDisplaySkeleton: React.FC<NoteDisplaySkeletonProps> = ({
  isDetailed,
}) => {
  return (
    <Box
      padding="6"
      boxShadow="lg"
      bg="white"
      h={!isDetailed ? 200 : '70vh'}
      w="full"
    >
      <Skeleton height="30px" my="2" width="100px" />
      <SkeletonText my="2" noOfLines={2} />
      <Stack direction="row" my="2">
        <Skeleton height="20px" width="100px" />
        <Skeleton height="20px" width="100px" />
        <Skeleton height="20px" width="100px" />
      </Stack>
      <Stack direction="row" my="2">
        <Box pt="1">
          <SkeletonCircle size="10" />
        </Box>

        <Stack direction="column">
          <Skeleton height="10px" width="100px" mt="3" />
          <Skeleton height="9px" width="100px" mb="4" />
        </Stack>
      </Stack>
      {isDetailed && (
        <>
          <Skeleton height="30px" my="2" width="50vw" />
          <SkeletonText mt="4" noOfLines={20} spacing="4" />
        </>
      )}
    </Box>
  );
};

export default NoteDisplaySkeleton;
