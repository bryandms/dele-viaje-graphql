module.exports = `
  "A type that describes the service."
  type Service {
    "The service's id."
    id: ID!
    "The service's name."
    name: String!
    "The service's icon."
    icon: String
    "The places (tourist sites) that have the service."
    places: [Place]!
  }

  "An input that describes the service."
  input iService {
    "The service's name."
    name: String!
    "The service's icon."
    icon: String
  }

  type Query {
    "Get the service that matches the ID."
    service(id: ID!): SingleResponse!
    "Get all services."
    services: Response!
  }

  type Mutation {
    "Create a new service."
    createService(service: iService!): SingleResponse!
    "Update a service."
    updateService(id: ID!, service: iService!): SingleResponse!
    "Delete a service."
    deleteService(id: ID!): SingleResponse!
  }
`
