// set up schema, type definitions, and resolver functions here;
// set up apollo server here;

const { ApolloServer, gql } = require("apollo-server");

/* TOPICS

Type Checking
Query vs. Mutation
Objects
Arrays
Arguments

*/

// this type definition enforces the expected data type of the return value from the resolver (it will attempt to cast the return value to this data type as a natural behavior);
const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

// the "!" character denotes a non-nullable field;
// if we return a value of "null" when we have a non-null type definition in place, we will generate an error;
const resolvers = {
  Query: {
    hello: function() {
      return null;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

// this will bootup our server on port 4000 by default;
// to configure to a different port, pass in an options object to the listen function like below:
// { port: 1234 };
server.listen().then((serverInfo) => console.log(`server started at ${serverInfo.url}`));