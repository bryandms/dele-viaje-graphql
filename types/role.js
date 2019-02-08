module.exports = `
  type Role {
    id: ID!
    name: String!
    users: [User]!
  }

  type Query {
    roles: [Role]!
  }

  type Mutation {
    createRole(name: String!): Response!
    deleteRole(id: ID!): Response!
  }
`
