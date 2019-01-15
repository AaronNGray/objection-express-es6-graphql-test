const graphql = require('graphql').graphql;
const graphQlBuilder = require('objection-graphql').builder;

// Objection.js models.
const Movie = require('./models/Movie');
const Person = require('./models/Person');
const Animal = require('./models/Animal');

// This is all you need to do to generate the schema.
const graphQlSchema = graphQlBuilder()
  .model(Movie)
  .model(Person)
  .model(Animal)
  .build();

// Execute a GraphQL query.
graphql(graphQlSchema, `{
  movies(nameLike: "%erminato%", range: [0, 2], orderBy: releaseDate) {
    name,
    releaseDate,

    actors(gender: Male, ageLte: 100, orderBy: firstName) {
      id
      firstName,
      age
    }
  }
}`).then(result => {
console.log(result.data.movies);
});

console.log("test");
