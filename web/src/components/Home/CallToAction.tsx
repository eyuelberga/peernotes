import React from 'react';
import {
  chakra,
  useColorModeValue,
  Box,
  SimpleGrid,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CallToActionProps } from './props';

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  body,
  children,
  link,
  description,
}) => {
  return (
    <Box bgGradient="linear(to-t, white, blue.50)">
      <SimpleGrid
        maxW="7xl"
        w={{ md: '3xl', lg: '4xl' }}
        alignItems="center"
        columns={{ base: 1, lg: 2, xl: 3 }}
        spacing={4}
        py={{ base: 6, lg: 4 }}
        px={{ base: 4, lg: 8 }}
        display={{ lg: 'flex' }}
      >
        <Box>
          <chakra.h2
            fontSize={{ base: '2xl', md: '4xl' }}
            fontWeight="extrabold"
            letterSpacing="tight"
            lineHeight="shorter"
            color={useColorModeValue('gray.900', 'gray.100')}
          >
            <chakra.span>{title}</chakra.span>
            <chakra.span color={useColorModeValue('blue.600', 'gray.500')}>
              {body}
            </chakra.span>
          </chakra.h2>
          <chakra.p color="gray.600">{description}</chakra.p>
        </Box>
        {link && (
          <Link to={link}>
            <Button colorScheme="blue">See All</Button>
          </Link>
        )}
      </SimpleGrid>
      {children}
    </Box>
  );
};
export default CallToAction;
