module.exports = `
  type Role {
    id: ID!
    name: String!
    users: [User]!
  }

  type Query {
    roles: Response!
  }

  type Mutation {
    createRole(name: String!): SingleResponse!
    deleteRole(id: ID!): SingleResponse!
  }
`
