/* eslint-disable no-underscore-dangle */

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  NormalizedCacheObject,
  split,
  from,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';

const getApolloClient: (
  bearerToken: string,
) => ApolloClient<NormalizedCacheObject> = (bearerToken) => {
  const connectionParams = () => {
    return {
      headers: {
        authorization: `Bearer ${bearerToken}`,
      },
    };
  };
  const wsLink = new WebSocketLink({
    uri: (window as any)._env_.REACT_APP_GRAPHQL_WSS_URL || '',
    options: {
      reconnect: true,
      lazy: true,
      connectionParams,
    },
  });
  const httpLink = new HttpLink({
    uri: (window as any)._env_.REACT_APP_GRAPHQL_HTTPS_URL,
  });
  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach((err) => {
        if (
          err?.extensions?.code === 'invalid-jwt' ||
          err?.extensions?.code === 'start-failed'
        ) {
          // eslint-disable-next-line no-alert
          window.alert('Could not connect to server! Try reloading the page');
        }
      });
    }
  });
  const authLink = new ApolloLink((operation, forward) => {
    const { headers } = operation.getContext();
    if (bearerToken) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${bearerToken}`,
          ...headers,
        },
      });
    }
    return forward(operation);
  });
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const apolloClient = new ApolloClient({
    link: from([errorLink, authLink, link]),

    cache: new InMemoryCache({}),
  });

  return apolloClient;
};

export default getApolloClient;
