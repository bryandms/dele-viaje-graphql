export default `
  type Service {
    id: ID!
    name: String!
    price: Float
    icon: String
    places: [Place]!
  }

  input iService {
    name: String!
    price: Float = 0
    icon: String
  }

  type Query {
    getService(id: ID!): Service
    allServices: [Service]!
  }

  type Mutation {
    createService(service: iService!): Service!
    updateService(id: ID!, service: iService!): Service!
    deleteService(id: ID!): Boolean!
  }
`;
