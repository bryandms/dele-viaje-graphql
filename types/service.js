module.exports = `
  type Service {
    id: ID!
    name: String!
    icon: String
    places: [Place]!
  }

  input iService {
    name: String!
    icon: String
  }

  type Query {
    service(id: ID!): Service
    services: [Service]!
  }

  type Mutation {
    createService(service: iService!): Response!
    updateService(id: ID!, service: iService!): Response!
    deleteService(id: ID!): Response!
  }
`
