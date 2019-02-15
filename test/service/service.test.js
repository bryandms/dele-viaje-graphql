const EasyGraphQLTester = require('easygraphql-tester')
const {
  serviceQuery,
  servicesQuery,
  createServiceMutation,
  updateServiceMutation,
  deleteServiceMutation
} = require('./serviceGraphql')

module.exports = (schema) => describe('Test queries and mutations of the service', () => {
  let tester

  before(() => {
    tester = new EasyGraphQLTester(schema)
  })

  describe('Queries', () => {
    it('service query', () => {
      tester.test(true, serviceQuery)
    })

    it('services query', () => {
      tester.test(true, servicesQuery)
    })
  })

  describe('Mutations', () => {
    it('createService mutation', () => {
      tester.test(true, createServiceMutation, {
        input: {
          scores: [1]
        }
      })
    })

    it('updateService mutation', () => {
      tester.test(true, updateServiceMutation, {
        input: {
          scores: [1]
        }
      })
    })

    it('deleteService mutation', () => {
      tester.test(true, deleteServiceMutation, {
        input: {
          scores: [1]
        }
      })
    })
  })
})
