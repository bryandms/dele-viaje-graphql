export default `
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
    numberOfVotes: Int
    websiteUrl: String
    phone: Int
    price: Float
    email: String
    schedule: JSON
    photos: JSON
    users: [User]!
    services: [Service]!
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
    numberOfVotes: Int = 0
    websiteUrl: String
    phone: Int
    price: Float
    email: String
    schedule: JSON
    photos: JSON
  }

  type Query {
    getPlace(id: ID!): Place!
    allPlaces: [Place]!
  }

  type Mutation {
    createPlace(place: iPlace!): Place!
    updatePlace(id: ID!, place: iPlace!): Place!
    deletePlace(id: ID!): Boolean!
    addService(serviceId: ID!, placeId: ID!): Boolean!
    removeService(serviceId: ID!, placeId: ID!): Boolean!
  }
`;
