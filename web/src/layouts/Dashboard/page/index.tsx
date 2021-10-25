/* eslint-disable react/destructuring-assignment */
import { ReactJSXElementChildrenAttribute } from '@emotion/react/types/jsx-namespace';
import { Box } from '@chakra-ui/react';

import React from 'react';

const Page = (props: { children: ReactJSXElementChildrenAttribute }) => {
  return <Box w="full">{props.children}</Box>;
};

export default Page;
