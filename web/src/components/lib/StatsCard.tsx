import React from 'react';
import { Box, chakra, IconButton, Flex, Spacer } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StatsCardProps } from './props';

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  stat,
  icon,
  description,
  onAction,
}) => {
  return (
    <Box mb={4} p={4} borderWidth="1px" borderRadius="lg">
      <Flex>
        <Box>
          <chakra.h2
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="extrabold"
            letterSpacing="tight"
            lineHeight="shorter"
            color="gray.900"
          >
            <chakra.span>{title}</chakra.span>
            {stat !== undefined && (
              <chakra.span color="blue.600">{` (${stat})`}</chakra.span>
            )}
          </chakra.h2>
          {description && <chakra.p color="gray.600">{description}</chakra.p>}
        </Box>
        <Spacer />
        {onAction && (
          <IconButton
            mx={1}
            colorScheme="blue"
            size="lg"
            variant="ghost"
            aria-label="create"
            onClick={onAction}
            icon={<FontAwesomeIcon icon="arrow-right" />}
          />
        )}
      </Flex>
    </Box>
  );
};
export default StatsCard;
