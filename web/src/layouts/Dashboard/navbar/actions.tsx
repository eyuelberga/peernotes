/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-sparse-arrays */
import React from 'react';
import { Stack } from '@chakra-ui/react';
import AccountMenu from '../../../components/lib/AccountMenu';

interface ActionProps {
  minimal?: boolean;
}

const ActionsList: React.FC<ActionProps> = ({ minimal }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={[2, 6]}>
      <AccountMenu minimal={minimal} />
    </Stack>
  );
};

export default ActionsList;
