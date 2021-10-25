/* eslint-disable import/no-cycle */
import React, { createContext } from 'react';
import {
  useDisclosure,
  UseDisclosureReturn,
  useMediaQuery,
  Box,
  Stack,
} from '@chakra-ui/react';
import Navbar from './navbar';
import Page from './page';
import Sidebar from './sidebar';
import MobileSidebar from './sidebar/mobile';

// @ts-expect-error: Let's ignore a compile error like this unreachable code
export const NavContext = createContext<UseDisclosureReturn>(null);

interface SiteLayoutProps {
  children?: any;
  minimal?: boolean;
}

const SiteLayout: React.FC<SiteLayoutProps> = ({ children, minimal }) => {
  const sidebarState = useDisclosure();
  const [isSmallScreen] = useMediaQuery('(max-width: 768px)');
  return (
    <NavContext.Provider value={sidebarState}>
      <Box textStyle="light">
        <Navbar hideNav={minimal} hideSearch={minimal} />
        <Box pos="relative" h="max-content" m={[2, 5]}>
          <Stack direction="row" spacing={{ md: 5 }}>
            {!minimal && <Sidebar />}
            {isSmallScreen && !minimal && <MobileSidebar />}
            <Page>{children}</Page>
          </Stack>
        </Box>
      </Box>
    </NavContext.Provider>
  );
};

export default SiteLayout;
