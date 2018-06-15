export default `
  type User {
    id: ID!
    username: String!
    email: String!
    gender: String!
    age: Int
    favoritePlaces: [Place]!
    roles: [Role]!
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
    getUser(id: ID!): User
  }

  type Response {
    success: Boolean!
    user: User
    token: String
    errors: [Error]
  }

  type Error {
    path: String!
    message: String!
  }

  type Mutation {
    login(email: String!, password: String!): Response!
    register(user: iUser!): Response!
    addFavPlace(placeId: ID!, userId: ID!): Boolean!
    removeFavPlace(placeId: ID!, userId: ID!): Boolean!
    addRole(roleId: ID!, userId: ID!): Boolean!
    removeRole(roleId: ID!, userId: ID!): Boolean!
  }
`;
