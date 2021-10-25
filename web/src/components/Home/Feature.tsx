import React from 'react';
import { Box, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react';
import { FeatureProps } from './props';

export const Feature: React.FC<FeatureProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <Stack
      spacing={{ base: '3', md: '6' }}
      direction={{ base: 'column', md: 'row' }}
    >
      <Box fontSize="6xl">{icon}</Box>
      <Stack spacing="1">
        <Text fontWeight="extrabold" fontSize="lg">
          {title}
        </Text>
        <Box color={mode('gray.600', 'gray.400')}>{description}</Box>
      </Stack>
    </Stack>
  );
};
export default Feature;
