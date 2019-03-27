module.exports = `
  "A type that describes the authentication payload."
  type AuthPayload {
    "Authentication token."
    token: String

    "User that authenticates."
    user: User
  }

  "A type that describes the user."
  type User {
    "The user's id."
    id: ID!

    "The user's username."
    username: String!

    "The user's email."
    email: String!

    "The places (tourist sites) that the user has added as favorite tourist sites."
    places: [Place]!

    "The roles that the user has."
    roles: [Role]!

    "It shows the relation of favorite tourist site between the place and the user."
    userPlaces: [UserPlaces]!
  }

  "An input that describes the user."
  input iUser {
    "The user's username."
    username: String!

    "The user's email."
    email: String!

    "The user's password."
    password: String!
  }

  type Query {
    "Get the user that matches the ID."
    user(id: ID!): User

    "Get all users."
    users: [User]!
  }

  type Mutation {
    "Login of a user."
    login(email: String!, password: String!): AuthPayload!

    "Register a new user."
    register(user: iUser!): AuthPayload!

    "Add a place (tourist site) to favorite tourist sites."
    addFavPlace(placeId: ID!, userId: ID!): Boolean

    "Remove a place (tourist site) to favorite tourist sites."
    removeFavPlace(placeId: ID!, userId: ID!): Boolean

    "Assign a rating to a place (tourist site)."
    setRating(userPlacesId: ID!, rating: Float!): UserPlaces

    "Add a role to the user."
    addRole(roleId: ID!, userId: ID!): Boolean

    "Remove a role to the user."
    removeRole(roleId: ID!, userId: ID!): Boolean
  }
`
