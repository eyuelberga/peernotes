/* eslint-disable import/no-cycle */
import React from 'react';
import { Flex, Spacer, Stack } from '@chakra-ui/react';
import Actions from './actions';
import Info from './info';
import NavButton from './nav-button';
import Search from './search';

interface NavbarProps {
  hideSearch?: boolean;
  hideNav?: boolean;
  hideAction?: boolean;
  hideInfo?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  hideSearch,
  hideNav,
  hideAction,
  hideInfo,
}) => {
  return (
    <Flex
      layerStyle="card"
      h="4.5rem"
      shadow="md"
      sx={{ position: 'sticky', top: 0 }}
      bg="white"
      zIndex={1000}
      p={5}
    >
      <Stack direction="row" w="full" alignItems="center" spacing={[0, 8]}>
        {!hideNav && <NavButton />}
        {!hideInfo && <Info />}
        {!hideSearch && <Search display={['none', '', 'flex']} />}
      </Stack>
      <Spacer />
      {!hideAction && <Actions minimal={hideSearch} />}
    </Flex>
  );
};

export default Navbar;
