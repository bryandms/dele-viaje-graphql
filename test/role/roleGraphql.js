const rolesQuery = `
  {
    roles {
      success
      data {
        ... on Role {
          id
          name
          users {
            username
          }
        }
      }
      token
      errors {
        path
        message
      }
    }
  }
`

const createRoleMutation = `
  mutation {
    createRole (
      name: "admin"
    ){
      success
      data {
        ... on Role {
          id
          name
        }
      }
      token
      errors {
        path
        message
      }
    }
  }
`

const deleteRoleMutation = `
  mutation {
    deleteRole (
      id: 1
    ){
      success
      data {
        ... on Role {
          id
          name
        }
      }
      token
      errors {
        path
        message
      }
    }
  }
`

module.exports = {
  rolesQuery,
  createRoleMutation,
  deleteRoleMutation
}
