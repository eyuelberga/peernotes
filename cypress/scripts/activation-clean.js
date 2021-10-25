const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();
const { gql, GraphQLClient } = require('graphql-request');
const graphQLClient = new GraphQLClient(
  process.env.REACT_APP_GRAPHQL_HTTPS_URL,
  {
    headers: {
      'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
    },
    fetch,
  },
);

const main = async () => {
  try {
    const clean = gql`
      mutation RESET($username: String!) {
        update_users(
          where: { username: { _eq: $username } }
          _set: { grade: null }
        ) {
          affected_rows
        }
        delete_user_subjects(where: { username: { _eq: $username } }) {
          affected_rows
        }
      }
    `;
    await graphQLClient.request(clean, {
      username: 'testuser3',
    });
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

main();
