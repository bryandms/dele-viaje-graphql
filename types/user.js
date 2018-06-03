export default `
  type User {
    id: ID!
    username: String!
    email: String!
    gender: String!
    age: Int
    favoritePlaces: [Place]!
  }

  input iUser {
    username: String!
    email: String!
    password: String!
    gender: String!
    age: Int
  }

  type Query {
    allUsers: [User]!
    getUser(id: ID!): User!
  }

  type Mutation {
    register(user: iUser!): User!
    addFavPlace(placeId: ID!, userId: ID!): Boolean!
    removeFavPlace(placeId: ID!, userId: ID!): Boolean!
  }
`;
