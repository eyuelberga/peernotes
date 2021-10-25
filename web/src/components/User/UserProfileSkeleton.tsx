import React from 'react';
import {
  SkeletonText,
  SkeletonCircle,
  Box,
  Skeleton,
  Stack,
} from '@chakra-ui/react';

const UserProfileSkeleton: React.FC<Record<string, never>> = () => {
  return (
    <Box boxShadow="lg" bg="white" p={4}>
      <Stack direction="column" align="center">
        <SkeletonCircle size="100px" mr="2" />
        <Stack direction="row" mt="3">
          <Skeleton height="10px" width="100px" />
          <Skeleton height="10px" width={50} />
        </Stack>
        <Skeleton height="10px" width="100px" mb="4" />
      </Stack>
      <SkeletonText mt={4} />
    </Box>
  );
};

export default UserProfileSkeleton;
