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

// Execute a GraphQL query.
graphql(graphQlSchema, `
  query IntrospectionQuery {
    __schema {
      queryType { name }
      mutationType { name }
      subscriptionType { name }
      types {
        ...FullType
      }
      directives {
        name
        description
        args {
          ...InputValue
        }
      }
    }
  }

  fragment FullType on __Type {
    kind
    name
    description
    fields(includeDeprecated: true) {
      name
      description
      args {
        ...InputValue
      }
      type {
        ...TypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...TypeRef
    }
  }

  fragment InputValue on __InputValue {
    name
    description
    type { ...TypeRef }
    defaultValue
  }

  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
        }
      }
    }
  }
`).then(result => {
  console.log(JSON.stringify(result, null, 2));
});
