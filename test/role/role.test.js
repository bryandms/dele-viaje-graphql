const EasyGraphQLTester = require('easygraphql-tester')
const {
  rolesQuery,
  createRoleMutation,
  deleteRoleMutation
} = require('./roleGraphql')

module.exports = (schema) => describe('Test queries and mutations of the role', () => {
  let tester

  before(() => {
    tester = new EasyGraphQLTester(schema)
  })

  describe('Queries', () => {
    it('roles query', () => {
      tester.test(true, rolesQuery)
    })
  })

  describe('Mutations', () => {
    it('createRole mutation', () => {
      tester.test(true, createRoleMutation, {
        input: {
          scores: [1]
        }
      })
    })

    it('deleteRole mutation', () => {
      tester.test(true, deleteRoleMutation, {
        input: {
          scores: [1]
        }
      })
    })
  })
})
