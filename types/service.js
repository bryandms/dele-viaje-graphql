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
    service(id: ID!): Service

    "Get all services."
    services: [Service]!
  }

  type Mutation {
    "Create a new service."
    createService(service: iService!): Service

    "Update a service."
    updateService(id: ID!, service: iService!): Service

    "Delete a service."
    deleteService(id: ID!): Boolean
  }
`
