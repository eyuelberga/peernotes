import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { FeaturesProps } from './props';
import FeatureComponent from './Feature';

const Features: React.FC<FeaturesProps> = ({ features }) => {
  return (
    <Box as="section" maxW="5xl" mx="auto" py="12" px={{ base: '6', md: '8' }}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacingX="10"
        spacingY={{ base: '8', md: '14' }}
      >
        {features.map(({ title, description, icon }) => (
          <FeatureComponent
            key={title}
            title={title}
            description={description}
            icon={icon}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Features;
