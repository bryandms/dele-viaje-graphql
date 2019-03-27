const rolesQuery = `
  {
    roles {
      id
      name
      users {
        id
        username
      }
    }
  }
`

const createRoleMutation = `
  mutation {
    createRole(
      name: "admin"
    ){
      id
      name
      users {
        id
        username
      }
    }
  }
`

const deleteRoleMutation = `
  mutation {
    deleteRole(id: 6)
  }
`

module.exports = {
  rolesQuery,
  createRoleMutation,
  deleteRoleMutation
}
