const { graphql, printSchema } = require('graphql');

const { Model } = require('objection');
const graphQlBuilder = require('objection-graphql').builder;

const Knex = require('knex');
const knexConfig = require('./knexfile');

// Initialize knex.
const knex = Knex(knexConfig.development);

// Bind all Models to a knex instance. If you only have one database in
// your server this is all you have to do. For multi database systems, see
// the Model.bindKnex method.

Model.knex(knex);

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

console.log(printSchema(graphQlSchema));
