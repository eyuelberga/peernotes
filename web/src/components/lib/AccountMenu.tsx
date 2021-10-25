import React, { useContext } from 'react';

import {
  Flex,
  Box,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuDivider,
  MenuItem,
  Menu,
  Button,
  Avatar,
  Text,
} from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import { AccountMenuProps } from './props';
import { UserMetaContext } from '../../contexts';
import { ME_PATH, PROFILE, NOTIFICATION } from '../../config/constants';

const AccountMenu: React.FC<AccountMenuProps> = ({ minimal }) => {
  const { profilePicture, fullname, username } = useContext(UserMetaContext);
  const { logout } = useAuth0();
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded="full"
        variant="link"
        cursor="pointer"
        minW={0}
      >
        <Avatar
          size="md"
          name={fullname || username}
          src={profilePicture || undefined}
        />
      </MenuButton>
      <MenuList>
        <Flex m={2}>
          <Box ml="3">
            <Text fontWeight="bold">{fullname}</Text>
            <Text fontSize="sm" color="gray.500">{`@${username}`}</Text>
          </Box>
        </Flex>
        <MenuDivider />
        <MenuGroup>
          {!minimal && (
            <>
              {' '}
              <Link to={`${ME_PATH}/${PROFILE}`}>
                <MenuItem>Profile</MenuItem>
              </Link>
              <Link to={`${ME_PATH}/${NOTIFICATION}`}>
                <MenuItem>Notifications</MenuItem>
              </Link>
            </>
          )}
          <MenuItem
            color="red"
            onClick={() => {
              logout({ returnTo: window.location.origin });
            }}
          >
            Logout
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
export default AccountMenu;
