import React from 'react';
import { Spinner, Flex, VStack } from '@chakra-ui/react';

const Loader: React.FC<Record<string, never>> = () => {
  return (
    <Flex justify="center" align="center" style={{ height: '100vh' }}>
      <VStack>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </VStack>
    </Flex>
  );
};
export default Loader;
