import React from 'react';
import { Stack, Text } from '@chakra-ui/react';
import Logo from '../logo';

const Info = () => {
  return (
    <Stack direction="row" alignItems="center" display={['none', 'flex']}>
      <Logo />
      <>
        <Text
          fontWeight="bold"
          bgGradient="linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)"
          bgClip="text"
        >
          Peer Notes
        </Text>
      </>
    </Stack>
  );
};

export default Info;
