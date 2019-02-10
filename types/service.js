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
    service(id: ID!): SingleResponse!
    services: Response!
  }

  type Mutation {
    createService(service: iService!): SingleResponse!
    updateService(id: ID!, service: iService!): SingleResponse!
    deleteService(id: ID!): SingleResponse!
  }
`
