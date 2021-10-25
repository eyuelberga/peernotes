const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const algoliasearch = require('algoliasearch');
const fetch = require('node-fetch');
const { gql, GraphQLClient } = require('graphql-request');
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY;
const ALGOLIA_INDEX = process.env.ALGOLIA_INDEX;

const graphQLClient = new GraphQLClient(process.env.HASURA_GRAPHQL_URL, {
  headers: {
    'x-hasura-admin-secret': process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  },
  fetch,
});
const algoliaClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);
const index = algoliaClient.initIndex(ALGOLIA_INDEX);
const query = gql`
  query GET_NOTE($id: uuid!) {
    note: notes_by_pk(id: $id) {
      id
      title
      content
      description
      published
      updatedAt: updated_at
      deletedAt: deleted_at
      score: engagement_score
      topic {
        id
        name
        textbook {
          gradeLevel: grade
          name
          subject
        }
      }
      createdBy: user {
        fullname
        username
        school
        profilePicture: profile_picture
      }
      likes: likes_aggregate {
        aggregate {
          count
        }
      }
      views: views_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', async (req, res) => {
  try {
    // webhook payload
    const {
      event: { op, data },
      table: { schema, name },
    } = req.body;
    const TABLE_NAME = 'notes';
    const published = data.new ? data.new.published : data.old.published;
    const deleted = data.new ? data.new.deleted_at : data.old.deleted_at;
    console.log(
      'processing note:',
      op,
      'published: ',
      published,
      'deleted: ',
      deleted,
    );

    // make sure the table name is correct and note is published
    if (name === TABLE_NAME && published) {
      if (op === 'INSERT' || op === 'UPDATE') {
        // remove from search if soft-deleted
        if (deleted) {
          const content = await index.deleteObject(data.new.id);
          console.log(
            200,
            'INSERT/UPDATE',
            'remove soft-deleted note:',
            data.new.id,
          );
          res.status(200).send({ content });
          return;
        } else {
          const objectID = data.new.id;
          const variables = { id: objectID };
          const response = await graphQLClient.request(query, variables);
          const newData = { ...response.note, objectID };

          const content = await index.saveObject(newData);
          console.log(200, 'INSERT/UPDATE', 'noteId:', objectID);
          res.status(200).send({ content });
          return;
        }
      } else if (op === 'DELETE') {
        const content = await index.deleteObject(data.old.id);
        console.log(200, 'DELETE', 'noteId', data.old.id);
        res.status(200).send({ content });
        return;
      }
    } else {
      // ignore if the trigger name is not matched
      console.log(
        400,
        'IGNORE',
        name,
        'published:',
        published,
        'deleted:',
        deleted,
      );
      res.status(400).send({ content: 'ignored event' });
      return;
    }
  } catch (error) {
    console.log('ERROR', error);
    res.status(500).send({ error });
    return;
  }
});

app.listen(app.get('port'), function () {
  console.log('Server started on: ' + app.get('port'));
});
