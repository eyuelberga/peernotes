import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ListHeaderProps } from './props';

const ListHeader: React.FC<ListHeaderProps> = ({
  title,
  linkName,
  linkPath,
}) => {
  return (
    <Flex align="baseline" px={2}>
      <Text fontSize="xl" fontWeight="light">
        {title}
      </Text>

      {linkPath && (
        <Link to={linkPath}>
          <Button colorScheme="blue" variant="link" ml={4}>
            {linkName || 'See All...'}
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default ListHeader;
