/**
 * Handler that will be called during the execution of a PreUserRegistration flow.
 *
 * @param {Event} event - Details about the context and user that is attempting to register.
 */
const fetch = require('node-fetch');
const { gql, GraphQLClient } = require('graphql-request');
exports.onExecutePostUserRegistration = async (event) => {
  try {
    const url = event.secrets.PEER_NOTES_HASURA_GRAPHQL_HTTPS_URL;
    const graphQLClient = new GraphQLClient(url, {
      headers: {
        'x-hasura-admin-secret': event.secrets.PEER_NOTES_HASURA_ADMIN_SECRET,
      },
      fetch,
    });
    const id = event.user.user_id;
    const email = event.user.email;
    const username = event.user.username || event.user.email;
    const profilePicture = event.user.picture;
    const fullname = event.user.name || event.user.username || event.user.email;
    const query = gql`
      mutation INSERT_USER(
        $email: String!
        $username: String!
        $id: String!
        $fullname: String!
        $profilePicture: String
      ) {
        insert_users_one(
          object: {
            email: $email
            id: $id
            username: $username
            role: "STUDENT"
            fullname: $fullname
            profile_picture: $profilePicture
          }
          on_conflict: {
            update_columns: [username, email, id]
            constraint: users_pkey
          }
        ) {
          username
          email
          id
        }
      }
    `;
    const variables = { id, email, username, profilePicture, fullname };
    const response = await graphQLClient.request(query, variables);
  } catch (e) {
    throw new Error('Technical Error. Please try again');
  }
};
