module.exports = `
  "A type that describes the role."
  type Role {
    "The role id."
    id: ID!
    "The role name."
    name: String!
    "Users who have the role."
    users: [User]!
  }

  type Query {
    "Get all roles."
    roles: Response!
  }

  type Mutation {
    "Create a new role."
    createRole(name: String!): SingleResponse!
    "Delete a role."
    deleteRole(id: ID!): SingleResponse!
  }
`
