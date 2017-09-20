const gql = require('graphql-tag');
const { getArticles, getComments, getUser } = require('./models');


const typeDefs = gql`
  type User {
    id: Int
    name: String
  }
  
  type Comment {
    id: Int
    author: User
    content: String
  }
  
  type Article {
    id: Int
    title: String
    author: User
    comments(author: String): [Comment]
  }

  type Query {
    articles(author: String): [Article]
  }
  
  schema {
    query: Query
    #mutation: Mutation
  }
`;


const resolvers = {
  Query: {
    articles: (obj, { author }) => getArticles({ author }),
  },
  Article: {
    author: (article) => getUser(article.author),
    comments: (article, { author }) => getComments(article.id, { author }),
  },
  Comment: {
    author: (article) => getUser(article.author),
  },
};


exports.typeDefs = typeDefs;
exports.resolvers = resolvers;
