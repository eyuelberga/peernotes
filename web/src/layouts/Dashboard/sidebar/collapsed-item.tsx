/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Link } from 'react-router-dom';
import {
  LinkBox,
  LinkOverlay,
  IconButton,
  Tooltip,
  Icon,
  chakra,
} from '@chakra-ui/react';
import { NavItemProps } from './nav-item';

const CollapsedItem = (props: NavItemProps & { scheme?: string }) => {
  return (
    <Tooltip hasArrow label={props.name} placement="right">
      <LinkBox display="flex" justifyContent="center">
        <IconButton
          colorScheme={props.active ? 'brand' : props.scheme}
          aria-label={props.name}
          variant={props.active ? 'solid' : 'ghost'}
          boxSize="40px"
          alignSelf="center"
          _focus={{ shadow: 'none' }}
          icon={
            <>
              <Link to={props.to || ''}>
                <LinkOverlay>
                  <Icon as={props.icon} fontSize="lg" />
                </LinkOverlay>
              </Link>
              {props.count && (
                <chakra.span
                  pos="absolute"
                  top="-1px"
                  right="-1px"
                  px={2}
                  py={1}
                  fontSize="xs"
                  fontWeight="bold"
                  lineHeight="none"
                  color="pink.100"
                  transform="translate(50%,-50%)"
                  bg="pink.600"
                  rounded="full"
                >
                  {props.count}
                </chakra.span>
              )}
            </>
          }
        />
      </LinkBox>
    </Tooltip>
  );
};

export default CollapsedItem;
