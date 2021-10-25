/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-cycle */
/* eslint-disable react/no-array-index-key */
import { Stack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import NavItem from './nav-item';
import { NavContext } from '..';
import CollapsedItem from './collapsed-item';
import { topRoutes } from './routes';

const Sidebar = () => {
  const { isOpen } = useContext(NavContext);
  const NavAction = isOpen ? CollapsedItem : NavItem;
  const [height, setHeight] = useState('');
  useEffect(() => {
    setHeight(`${window.innerHeight - 100}px`);
  }, []);
  return (
    <Stack
      layerStyle="card"
      rounded="xl"
      w={isOpen ? '60px' : '300px'}
      transition="width .4s ease-in-out"
      py={8}
      shadow="md"
      sx={{ position: 'sticky', top: '4.5rem' }}
      h={height}
      spacing={2}
      fontSize="sm"
      display={['none', '', 'initial']}
      overflowX={isOpen ? 'initial' : 'clip'}
      overflowY="scroll"
    >
      {topRoutes.map(({ name, to, icon }, rid) => (
        <NavAction key={`nav-item-${rid}`} name={name} to={to} icon={icon} />
      ))}
    </Stack>
  );
};

export default Sidebar;
