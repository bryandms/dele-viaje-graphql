const EasyGraphQLTester = require('easygraphql-tester')
const {
  userQuery,
  usersQuery,
  loginMutation,
  registerMutation,
  addFavPlaceMutation,
  removeFavPlaceMutation,
  setRatingMutation,
  addRoleMutation,
  removeRoleMutation
} = require('./userGraphql')

module.exports = (schema) => describe('Test queries and mutations of the user', () => {
  let tester

  before(() => {
    tester = new EasyGraphQLTester(schema)
  })

  describe('Queries', () => {
    it('user query', () => {
      tester.test(true, userQuery)
    })

    it('users query', () => {
      tester.test(true, usersQuery)
    })
  })

  describe('Mutations', () => {
    it('login mutation', () => {
      tester.test(true, loginMutation, {
        input: {
          scores: [1]
        }
      })
    })

    it('register mutation', () => {
      tester.test(true, registerMutation, {
        input: {
          scores: [1]
        }
      })
    })

    it('addFavPlace mutation', () => {
      tester.test(true, addFavPlaceMutation, {
        input: {
          scores: [1]
        }
      })
    })

    it('removeFavPlace mutation', () => {
      tester.test(true, removeFavPlaceMutation, {
        input: {
          scores: [1]
        }
      })
    })

    it('setRating mutation', () => {
      tester.test(true, setRatingMutation, {
        input: {
          scores: [1]
        }
      })
    })

    it('addRole mutation', () => {
      tester.test(true, addRoleMutation, {
        input: {
          scores: [1]
        }
      })
    })

    it('removeRole mutation', () => {
      tester.test(true, removeRoleMutation, {
        input: {
          scores: [1]
        }
      })
    })
  })
})
