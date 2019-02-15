const EasyGraphQLTester = require('easygraphql-tester')
const {
  findPlacesQuery,
  placeQuery,
  placesQuery,
  createPlaceMutation,
  updatePlaceMutation,
  deletePlaceMutation,
  addServiceMutation,
  removeServiceMutation
} = require('./placeGraphql')

module.exports = (schema) => describe('Test queries and mutations of the place', () => {
  let tester

  before(() => {
    tester = new EasyGraphQLTester(schema)
  })

  describe('Queries', () => {
    it('findPlaces query', () => {
      tester.test(true, findPlacesQuery)
    })

    it('place query', () => {
      tester.test(true, placeQuery)
    })

    it('places query', () => {
      tester.test(true, placesQuery)
    })
  })

  describe('Mutations', () => {
    it('createPlace mutation', () => {
      tester.test(true, createPlaceMutation, {
        input: {
          scores: [1]
        }
      })
    })

    it('updatePlace mutation', () => {
      tester.test(true, updatePlaceMutation, {
        input: {
          scores: [1]
        }
      })
    })

    it('deletePlace mutation', () => {
      tester.test(true, deletePlaceMutation, {
        input: {
          scores: [1]
        }
      })
    })

    it('addService mutation', () => {
      tester.test(true, addServiceMutation, {
        input: {
          scores: [1]
        }
      })
    })

    it('removeService mutation', () => {
      tester.test(true, removeServiceMutation, {
        input: {
          scores: [1]
        }
      })
    })
  })
})
