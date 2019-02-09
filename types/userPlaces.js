module.exports = `
  type UserPlaces {
    id: ID!
    rating: Float!
    placeId: Int!
    userId: Int!
    users: [User]!
  }
`
