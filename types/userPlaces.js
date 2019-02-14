module.exports = `
"A type that describes the relation of favorite tourist site between the place and the user."
  type UserPlaces {
    "The ID of the UserPlaces relationship."
    id: ID!
    "The rating that the user has assigned to the place (tourist site)."
    rating: Float!
    "The place's id."
    placeId: Int!
    "The user's id."
    userId: Int!
  }
`
