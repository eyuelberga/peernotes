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
    const deleteNotes = gql`
      mutation DELETE_ALL_NOTES($username: String!) {
        delete_notes(where: { created_by: { _eq: $username } }) {
          affected_rows
        }
        delete_note_bookmarks(where: { username: { _eq: $username } }) {
          affected_rows
        }
        delete_note_likes(where: { username: { _eq: $username } }) {
          affected_rows
        }
        delete_note_reports(where: { username: { _eq: $username } }) {
          affected_rows
        }
      }
    `;
    const createNote = gql`
      mutation CREATE_NOTE(
        $title: String!
        $description: String
        $topic_id: uuid!
        $content: String!
        $username: String!
      ) {
        note: insert_notes_one(
          object: {
            content: $content
            description: $description
            topic_id: $topic_id
            title: $title
            created_by: $username
            published: true
          }
        ) {
          id
        }
      }
    `;
    await graphQLClient.request(deleteNotes, {
      username: 'testuser2',
    });
    await graphQLClient.request(createNote, {
      username: 'testuser2',
      title: 'My Test Note',
      description: 'Hello this is my test note',
      content: 'This is a test content',
      topic_id: '43b9396a-7660-440c-b808-ac078d08643c',
    });
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

main();
