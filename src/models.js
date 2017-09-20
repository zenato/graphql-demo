const sqlite3 = require('sqlite3').verbose();


const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './test.db',
  },
});


function getArticles({ author } = {}) {
  const builder = knex('articles as a')
    .select(
      'a.id',
      'a.title',
      'a.author',
    );

  if (author) {
    builder.join('users as u', 'u.id', 'a.author');
    builder.where('u.name', author);
  }

  return builder;
}

function getComments(article, { author }) {
  const builder = knex('comments as c')
    .where('c.article', article)
    .select(
      'c.id',
      'c.content',
      'c.author',
    );

  if (author) {
    builder.join('users as u', 'u.id', 'c.author');
    builder.where('u.name', author);
  }

  return builder;
}

function getUser(id) {
  return knex('users')
    .where('id', id)
    .first(
      'id',
      'name',
    );
}


exports.getArticles = getArticles;
exports.getComments = getComments;
exports.getUser = getUser;
