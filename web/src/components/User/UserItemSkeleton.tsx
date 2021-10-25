import React from 'react';
import {
  SkeletonCircle,
  Box,
  Skeleton,
  Stack,
  Flex,
  Spacer,
} from '@chakra-ui/react';

const UserItemSkeleton: React.FC<Record<string, any>> = () => {
  return (
    <Box padding="2" boxShadow="lg" bg="white">
      <Flex my="2">
        <Box pt="1">
          <SkeletonCircle size="10" mr="2" />
        </Box>

        <Stack direction="column">
          <Stack direction="row" mt="3">
            <Skeleton height="10px" width="100px" />
            <Skeleton height="10px" width={50} />
          </Stack>
          <Skeleton height="10px" width="100px" mb="4" />
        </Stack>
        <Spacer />
        <>
          <Skeleton height="40px" width="40px" mr="2" />
          <Skeleton height="40px" width="40px" />
        </>
      </Flex>
    </Box>
  );
};

export default UserItemSkeleton;
