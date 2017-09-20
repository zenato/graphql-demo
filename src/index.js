const { graphql } = require('graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { typeDefs, resolvers } = require('./schema');


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

graphql(
  schema,
  `
    {
      articles(author: "tester-1") {
        id
        title
        author {
          name
        }
        comments(author: "tester-2") {
          content
          author {
            name
          }
        }
      }
    }
  `
)
.then(result => {
  console.log('Result');
  console.log(JSON.stringify(result));
});
