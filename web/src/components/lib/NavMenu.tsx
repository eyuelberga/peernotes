import React from 'react';
import {
  Menu,
  MenuItem,
  MenuDivider,
  MenuList,
  MenuButton,
  IconButton,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import { NavMenuProps } from './props';

const NavMenu: React.FC<NavMenuProps> = ({ actions }) => {
  const location = useLocation();
  return (
    <Menu>
      <MenuButton
        role="combobox"
        rounded="lg"
        as={IconButton}
        variant="outline"
        colorScheme="blue"
        icon={<FontAwesomeIcon icon="bars" />}
      />
      <MenuList>
        {actions.map((action) => {
          if (action === 'divider') {
            return <MenuDivider key={`${action}`} />;
          }
          return (
            <>
              {location.pathname !== action.to && (
                <Link to={action.to} key={action.to}>
                  <MenuItem
                    icon={
                      action.icon ? (
                        <FontAwesomeIcon icon={action.icon} />
                      ) : undefined
                    }
                  >
                    {action.name}
                  </MenuItem>
                </Link>
              )}
            </>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default NavMenu;
