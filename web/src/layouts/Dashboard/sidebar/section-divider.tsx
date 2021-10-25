/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

const SectionDivider = (props: BoxProps) => {
  return <Box textTransform="uppercase" px={8} pt={4} {...props} />;
};

export default SectionDivider;
