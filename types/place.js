module.exports = `
  scalar JSON

  "A type that describes the place (tourist site)."
  type Place {
    "The place's id."
    id: ID!
    "The place's name."
    name: String!
    "The place's description."
    description: String
    "The place's latitude."
    latitude: Float!
    "The place's longitude."
    longitude: Float!
    "The place's province."
    province: String!
    "The place's accessibility."
    accessibility: String!
    "The place's category."
    category: String!
    "The place's global score."
    score: Float
    "The place's total number of votes."
    votes: Int
    "The place's website."
    website: String
    "The place's phone."
    phone: Int
    "The place's email."
    email: String
    "The place's schedule in JSON format."
    schedule: JSON
    "The place's photos in JSON format."
    photos: JSON
    "Users who have added the place as a favorite tourist site."
    users: [User]!
    "The place's services."
    services: [Service]!
    "It shows the relation of favorite tourist site between the place and the user."
    userPlaces: [UserPlaces]!
  }

  "An input that describes the place (tourist site)."
  input iPlace {
    "The place's name."
    name: String!
    "The place's description."
    description: String
    "The place's latitude."
    latitude: Float!
    "The place's longitude."
    longitude: Float!
    "The place's province."
    province: String!
    "The place's accessibility."
    accessibility: String!
    "The place's category."
    category: String!
    "The place's global score."
    score: Float = 0
    "The place's total number of votes."
    votes: Int = 0
    "The place's website."
    website: String
    "The place's phone."
    phone: Int
    "The place's email."
    email: String
    "The place's schedule in JSON format."
    schedule: JSON
    "The place's photos in JSON format."
    photos: JSON
  }

  "An input that describes the search criteria for places (tourist sites)."
  input iFindPlace {
    "The place's province."
    province: String
    "The place's accessibility."
    accessibility: String
    "The place's category."
    category: String
  }

  type Query {
    "Get the place (tourist site) that matches the ID."
    place(id: ID!): SingleResponse!
    "Get all places (tourist sites)."
    places: Response!
    "Get the places (tourist sites) that match or resemble the search criteria using the Euclidean distance algorithm."
    findPlaces(place: iFindPlace): Response!
  }

  type Mutation {
    "Create a new place (tourist site)."
    createPlace(place: iPlace!): SingleResponse!
    "Update a place (tourist site)."
    updatePlace(id: ID!, place: iPlace!): SingleResponse!
    "Delete a place (tourist site)."
    deletePlace(id: ID!): SingleResponse!
    "Add a service to the place (tourist site)."
    addService(serviceId: ID!, placeId: ID!): SingleResponse!
    "Remove a service to the place (tourist site)."
    removeService(serviceId: ID!, placeId: ID!): SingleResponse!
  }
`
