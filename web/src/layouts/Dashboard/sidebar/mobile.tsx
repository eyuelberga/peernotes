/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerBody,
  Stack,
} from '@chakra-ui/react';
import { NavContext } from '..';
import Search from '../navbar/search';
import NavItem from './nav-item';
import { topRoutes } from './routes';

const MobileSidebar = () => {
  const { isOpen, onClose } = useContext(NavContext);
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="left"
      blockScrollOnMount={false}
    >
      <DrawerOverlay display={['initial', '', 'none']}>
        <DrawerContent layerStyle="neutral">
          <DrawerHeader borderBottomWidth="1px">
            <Search w="full" mr="2" />
            <DrawerCloseButton />
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing={2} fontSize="sm">
              {topRoutes.map(({ name, to, icon }, rid) => (
                <NavItem
                  key={`nav-item-${rid}`}
                  name={name}
                  to={to}
                  icon={icon}
                />
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default MobileSidebar;
