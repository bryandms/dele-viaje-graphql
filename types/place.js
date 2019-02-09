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
    place(id: ID!): Place
    places: [Place]!
  }

  type Mutation {
    createPlace(place: iPlace!): Response!
    updatePlace(id: ID!, place: iPlace!): Response!
    deletePlace(id: ID!): Response!
    addService(serviceId: ID!, placeId: ID!): Boolean!
    removeService(serviceId: ID!, placeId: ID!): Boolean!
  }
`
