/**
 * Handler that will be called during the execution of a PostLogin flow.
 *
 * @param {Event} event - Details about the user and the context in which they are logging in.
 * @param {PostLoginAPI} api - Interface whose methods can be used to change the behavior of the login.
 */
const fetch = require('node-fetch');
const { gql, GraphQLClient } = require('graphql-request');
exports.onExecutePostLogin = async (event, api) => {
  const url = event.secrets.PEER_NOTES_HASURA_GRAPHQL_HTTPS_URL;
  const graphQLClient = new GraphQLClient(url, {
    headers: {
      'x-hasura-admin-secret': event.secrets.PEER_NOTES_HASURA_ADMIN_SECRET,
    },
    fetch,
  });
  const namespace = 'https://hasura.io/jwt/claims';
  const query = gql`
    query GET_USER($id: String!) {
      users(where: { id: { _eq: $id } }, limit: 1) {
        email
        fullname
        grade
        id
        profile_picture
        role
        school
        username
        subjects {
          subject
        }
      }
    }
  `;
  const variables = { id: event.user.user_id };
  const response = await graphQLClient.request(query, variables);
  const user = response.users[0];
  const role = user.role;
  const subjects = user.subjects.map(({ subject }) => {
    return subject;
  });
  const gradeLevel = user.grade;
  const school = user.school;
  let accountStatus =
    subjects.length && gradeLevel ? 'activated' : 'not-active';
  const username = user.username;
  const email = user.email;
  const fullname = user.fullname;
  const id = user.id;
  const profilePicture = user.profile_picture;
  api.accessToken.setCustomClaim(namespace, {
    'x-hasura-default-role': role,
    'x-hasura-allowed-roles': [role],
    'x-hasura-user-id': id,
    'x-hasura-username': username,
  });
  const user_metadata = {
    fullname,
    subjects,
    school,
    gradeLevel,
    role,
    username,
    profilePicture,
    accountStatus,
  };
  api.user.setUserMetadata('profile', user_metadata);
  api.idToken.setCustomClaim(namespace + '/profile', user_metadata);
};
