/* eslint-disable no-underscore-dangle */

import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './pages';
import history from './utils/history';
import './config/icons';
import './i18n';

const onRedirectCallback = (appState: any) => {
  history.push(
    appState && appState.returnTo
      ? appState.returnTo
      : window.location.pathname,
  );
};
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={(window as any)._env_.REACT_APP_AUTH0_DOMAIN || ''}
      clientId={(window as any)._env_.REACT_APP_AUTH0_CLIENT_ID || ''}
      audience={(window as any)._env_.REACT_APP_AUTH0_AUDIENCE || ''}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
