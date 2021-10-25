import React from 'react';
import { Flex, Heading, VStack, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EmptyPlaceholderProps } from './props';

const EmptyPlaceholder: React.FC<EmptyPlaceholderProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Flex justify="center" align="center">
      <VStack>
        <Text style={{ fontSize: '100px' }} color="gray.300">
          <FontAwesomeIcon icon={icon} />
        </Text>
        <Heading color="gray.400" size="lg">
          {title}
        </Heading>
        <Heading color="gray.400" size="md" fontWeight="semi-bold">
          {description}
        </Heading>
      </VStack>
    </Flex>
  );
};
export default EmptyPlaceholder;
