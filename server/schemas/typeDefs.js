const typeDefs = `
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
    }

    type Auth {
        token: ID
    }

    type Query {
        me: User
    }

    type Mutation {
        signin(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }
`;

// using gql type system to determine type of data we are serving
// query and mutation to determine endpoints of api's we are serving
// these are fields that you are sending to the frontend
// '!' means field is required

module.exports = typeDefs;