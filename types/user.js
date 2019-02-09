module.exports = `
  type User {
    id: ID!
    username: String!
    email: String!
    places: [Place]!
    roles: [Role]!
    userPlaces: [UserPlaces]!
  }

  input iUser {
    username: String!
    email: String!
    password: String!
  }

  type Query {
    user(id: ID!): User
    users: [User]!
  }

  type Mutation {
    login(email: String!, password: String!): Boolean!
    register(user: iUser!): Response!
    addFavPlace(placeId: ID!, userId: ID!): Boolean!
    removeFavPlace(placeId: ID!, userId: ID!): Boolean!
    setRating(userPlacesId: ID!, rating: Float!): Float!
    addRole(roleId: ID!, userId: ID!): Boolean!
    removeRole(roleId: ID!, userId: ID!): Boolean!
  }
`
