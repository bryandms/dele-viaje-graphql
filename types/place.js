module.exports = `
  scalar JSON

  type Place {
    id: ID!
    name: String!
    description: String
    latitude: Float!
    longitude: Float!
    province: String!
    accessibility: String!
    category: String!
    score: Float
    votes: Int
    website: String
    phone: Int
    email: String
    schedule: JSON
    photos: JSON
    users: [User]!
    services: [Service]!
    userPlaces: [UserPlaces]!
  }

  input iPlace {
    name: String!
    description: String
    latitude: Float!
    longitude: Float!
    province: String!
    accessibility: String!
    category: String!
    score: Float = 0
    votes: Int = 0
    website: String
    phone: Int
    email: String
    schedule: JSON
    photos: JSON
  }

  type Query {
    place(id: ID!): SingleResponse!
    places: Response!
  }

  type Mutation {
    createPlace(place: iPlace!): SingleResponse!
    updatePlace(id: ID!, place: iPlace!): SingleResponse!
    deletePlace(id: ID!): SingleResponse!
    addService(serviceId: ID!, placeId: ID!): SingleResponse!
    removeService(serviceId: ID!, placeId: ID!): SingleResponse!
  }
`
