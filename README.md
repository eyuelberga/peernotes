<p align="center">
  <a href="https://github.com/eyuelberga/peernotes">
    <img src="https://github.com/eyuelberga/peernotes/blob/main/assets/logo.png?raw=true" alt="Peer Notes logo" width="300" />
  </a>
</p>

<br>

<p align="center">
<a href="https://github.com/eyuelberga/peernotes/blob/main/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/eyuelberga/peernotes"></a>
</p>
<br />

Peer Notes is a web application for High School Students to share and access school notes.

The project was built using React for the frontend web app, Auth0 for managing user authentication, Hasura GraphQL Engine, Algolia for search and also Cloudnary for image upload.

## Getting Started

To quickly run the project, use docker-compose. But before that, you need to setup some environment variables which are listed below:

```
HASURA_GRAPHQL_ADMIN_SECRET
HASURA_GRAPHQL_METADATA_DATABASE_URL
HASURA_GRAPHQL_JWT_SECRET
POSTGRES_PASSWORD
ALGOLIA_ADMIN_API_KEY
ALGOLIA_APP_ID
ALGOLIA_INDEX
HASURA_GRAPHQL_URL
REACT_APP_AUTH0_DOMAIN
REACT_APP_AUTH0_CLIENT_ID
REACT_APP_AUTH0_AUDIENCE
REACT_APP_CLOUDNARY_CLOUD_NAME
REACT_APP_CLOUDNARY_UPLOAD_PRESET
REACT_APP_ALGOLIA_APP_ID
REACT_APP_ALGOLIA_API_KEY
REACT_APP_ALGOLIA_INDEX

```

Create a `.env` file in the project root and add values to the above variables. **Please note**, you need to create Algolia and Cloudnary account to get the values for some of the environment variables.

## Setting up Auth0

In order for Hasura and Auth0 to work you need to setup two actions, which can be found at `/auth0/actions` folder.

Both actions have two environment variables you need to supply:

```
PEER_NOTES_HASURA_GRAPHQL_HTTPS_URL: absolute url to the GraphQL API
PEER_NOTES_HASURA_ADMIN_SECRET: admin secret for the API

```

- `hasura-jwt-clams` action should be added to the `Login` flow
- `sync-user-with-db` action should be added to the `Post User Registration` flow

You also need to get the JWT secret from Auth0. use [this link to get the JWT config](https://hasura.io/jwt-config/).

## Setting up Algolia

The setup for Algolia is quite forward. You just need to get the following information from your Dashboard and set them as environment variables:

- APP ID
- API KEY
- INDEX

You do however need to do some configuration to make sure search results are displayed in a certain order and allow filtering. You can configure this in your Dashboard configuration menu under `RELEVANCE ESSENTIALS` and `FILTERING AND FACETING`

Run the following command on the root of the project folder.

```shell
$ docker-compose up
```

## License

MIT © [Eyuel Berga](https://github.com/eyuelberga)
