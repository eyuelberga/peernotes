import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Router, Route, Switch, useHistory } from 'react-router-dom';
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import { ApolloProvider } from '@apollo/client';
import routes from './routes';
import history from '../../utils/history';
import ApolloClient from '../../config/apollo';
import Loader from '../../components/lib/Loader';
import {
  METADATA_NAMESPACE,
  APP_PATH,
  PLATFORM_MODERATOR_PATH,
  STUDENT_ROLE,
  PLATFORM_MODERATOR_ROLE,
  GET_STARTED,
  MANAGE,
} from '../../config/constants';
import { UserMetaContext } from '../../contexts';
import { Auth0Extended } from '../../interfaces';

const App: React.FC<Record<string, never>> = () => {
  const { user, getAccessTokenSilently } = useAuth0<Auth0Extended>();
  const rawMetadata = user?.[METADATA_NAMESPACE];
  const metadata = {
    ...rawMetadata,
  };
  const metadataRef = useRef(metadata);
  const historyRef = useRef(useHistory());
  const getAccessTokenSilentlyRef = useRef(getAccessTokenSilently);
  const [bearerToken, setBearerToken] = useState<string | null>(null);
  useEffect(() => {
    async function getToken() {
      const token = await getAccessTokenSilentlyRef.current();
      setBearerToken(token);
    }
    getToken();
  }, []);

  useEffect(() => {
    if (
      metadataRef.current.accountStatus !== 'activated' &&
      metadataRef.current.role === STUDENT_ROLE
    ) {
      historyRef.current.push(`${APP_PATH}/${GET_STARTED}`);
    } else if (metadataRef.current.role === PLATFORM_MODERATOR_ROLE) {
      historyRef.current.push(`${PLATFORM_MODERATOR_PATH}/${MANAGE}`);
    }
  }, [historyRef.current.location.pathname]);

  return (
    <>
      {bearerToken && (
        <ApolloProvider client={ApolloClient(bearerToken)}>
          <UserMetaContext.Provider value={metadata}>
            <Router history={history}>
              <Switch>
                <Suspense fallback={<Loader />}>
                  {routes.map(({ path, exact, component }) => (
                    <Route
                      key={path}
                      path={path}
                      exact={exact}
                      component={component}
                    />
                  ))}
                </Suspense>
              </Switch>
            </Router>
          </UserMetaContext.Provider>
        </ApolloProvider>
      )}
    </>
  );
};

export default withAuthenticationRequired(App, {
  onRedirecting: () => <Loader />,
});
