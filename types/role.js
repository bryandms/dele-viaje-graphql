export default `
  type Role {
    id: ID!
    name: String!
    users: [User]!
  }

  type Query {
    allRoles: [Role]!
  }

  type Mutation {
    createRole(name: String!): Role!
    deleteRole(id: ID!): Boolean!
  }
`;
