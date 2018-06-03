export default `
  type Service {
    id: ID!
    name: String!
    description: String!
    price: Float
    iconClass: String
    places: [Place]!
  }

  input iService {
    name: String!
    description: String!
    price: Float = 0
    iconClass: String
  }

  type Query {
    getService(id: ID!): Service!
    allServices: [Service]!
  }

  type Mutation {
    createService(service: iService!): Service!
    updateService(id: ID!, service: iService!): Service!
    deleteService(id: ID!): Boolean!
  }
`;
