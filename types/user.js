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
    user(id: ID!): SingleResponse!
    users: Response!
  }

  type Mutation {
    login(email: String!, password: String!): SingleResponse!
    register(user: iUser!): SingleResponse!
    addFavPlace(placeId: ID!, userId: ID!): SingleResponse!
    removeFavPlace(placeId: ID!, userId: ID!): SingleResponse!
    setRating(userPlacesId: ID!, rating: Float!): SingleResponse!
    addRole(roleId: ID!, userId: ID!): SingleResponse!
    removeRole(roleId: ID!, userId: ID!): SingleResponse!
  }
`
