// set up schema, type definitions, and resolver functions here;
// set up apollo server here;

const { ApolloServer, gql } = require("apollo-server");

/* TOPICS

Type Checking
Query vs. Mutation
Objects
Arrays
Arguments
Custom Types

*/

/* CRUD

Create, Read, Update, Delete

Create - Mutation
Read - Query
Update - Mutation
Delete - Mutation

*/

// this type definition enforces the expected data type of the return value from the resolver (it will
// attempt to cast the return value to this data type as a natural behavior);
// when you have a list of GraphQL objects, you can ensure that the list itself does not resolve to null,
// and in addition to that, you can ensure that the elements within the list do not resolve to null
// either: [Error!]!;
const typeDefs = gql`
  type Query {
    hello: String!
    user: User!
  }

  type User {
    id: ID!
    username: String!
  }

  type Error {
    field: String!
    message: String!
  }

  type RegisterResponse {
    errors: [Error!]!
    user: User
  }

  input UserInfo {
    username: String!
    password: String!
    age: Int
  }

  type Mutation {
    register(userInfo: UserInfo): RegisterResponse!
    login(userInfo: UserInfo): Boolean!
  }
`;

// the "!" character denotes a non-nullable field;
// if we return a value of "null" when we have a non-null type definition in place, we will generate an
// error;

// Query: these run in parallel;
// Mutation: these run sequentially;
const resolvers = {
  Query: {
    hello: function() {
      return "hello world";
    },
    user: function () {
      return {
        id: 1,
        username: "bob"
      }
    }
  },

  Mutation: {
    login: function() {
      return true;
    },
    register: function() {
      return { 
        errors: [{ field: "username", message: "bad" }, { field: "id", message: "bad"}],
        user: {
          id: 1,
          username: "bob"
        }
      }
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

// this will bootup our server on port 4000 by default;
// to configure to a different port, pass in an options object to the listen function like below:
// { port: 1234 };
server.listen().then((serverInfo) => console.log(`server started at ${serverInfo.url}`));