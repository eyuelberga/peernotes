/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import {
  BoxProps,
  LinkBox,
  LinkOverlay,
  Spacer,
  Stack,
  Text,
  Icon,
  chakra,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

export type NavItemProps = {
  icon: IconType;
  active?: boolean;
  count?: number;
  to?: string;
  name: string;
};
const NavItem = (props: NavItemProps) => {
  const activeColor = mode('brand.600', 'white');
  const activeProps: BoxProps = {
    color: activeColor,
    borderRightColor: props.active ? activeColor : undefined,
    bg: 'blackAlpha.300',
  };

  return (
    <Link to={props.to || ''}>
      <LinkBox>
        <Stack
          direction="row"
          cursor="pointer"
          px={8}
          py={4}
          spacing={4}
          alignItems="center"
          fontWeight="semibold"
          transition="all .4s ease-in-out"
          borderRightWidth="3px"
          borderRightColor="transparent"
          _hover={activeProps}
          {...(props.active && activeProps)}
        >
          <Icon as={props.icon} fontSize="xl" />

          <LinkOverlay>
            <Text>{props.name}</Text>
          </LinkOverlay>

          <Spacer />
          {props.count && (
            <chakra.span
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              px={2}
              py={1}
              fontSize="xs"
              fontWeight="bold"
              lineHeight="none"
              color="pink.50"
              bg="pink.500"
              rounded="full"
            >
              {props.count}
            </chakra.span>
          )}
        </Stack>
      </LinkBox>
    </Link>
  );
};

export default NavItem;
