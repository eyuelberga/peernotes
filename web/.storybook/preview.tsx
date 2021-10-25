import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Router } from 'react-router-dom';
import '../src/config/icons';
import '../src/i18n';
import history from '../src/utils/history';

const withChakra = (StoryFn: Function) => {
  return (
    <ChakraProvider>
      <Router history={history}>
        <div id="story-wrapper" style={{ minHeight: '100vh' }}>
          <StoryFn />
        </div>
      </Router>
    </ChakraProvider>
  );
};

export const decorators = [withChakra];
