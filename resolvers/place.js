const { isAuthenticatedResolver } = require('../helpers/permissions')
const euclidean = require('../helpers/euclideanDistanceAlgorithm')
const baseController = require('../helpers/baseController')

module.exports = {
  Place: {
    users: async (parent, args, context, info) => await parent.getUsers(),
    services: async (parent, args, context, info) => await parent.getServices(),
    userPlaces: async (parent, args, context, info) => await parent.getUsers()
      .then(users => {
        return users.map(user => user.dataValues.UserPlaces)
      })
  },

  Query: {
    place: (parent, { id }, { db }, info) =>
      baseController.findByPk(db.Place, id, 'place'),

    places: isAuthenticatedResolver.createResolver(
      (parent, args, { db }, info) =>
        baseController.findAll(db.Place)
    ),

    findPlaces: (parent, { place }, { db }, info) =>
      db.Place.findAll()
        .then(places => euclidean(place, places))
  },

  Mutation: {
    createPlace: isAuthenticatedResolver.createResolver(
      (parent, { place }, { db }, info) =>
        baseController.create(db.Place, place)
    ),

    updatePlace: isAuthenticatedResolver.createResolver(
      (parent, { id, place }, { db }, info) =>
        baseController.update(db.Place, id, place, 'place')
    ),

    deletePlace: isAuthenticatedResolver.createResolver(
      (parent, { id }, { db }, info) =>
        baseController.destroy(db.Place, id, 'place')
    ),

    addService: isAuthenticatedResolver.createResolver(
      (parent, { serviceId, placeId }, { db }, info) =>
        baseController.addAssociation(db.Place, placeId, 'addService', serviceId)
    ),

    removeService: isAuthenticatedResolver.createResolver(
      (parent, { serviceId, placeId }, { db }, info) =>
        baseController.removeAssociation(db.Place, placeId, 'removeService', serviceId)
    )
  }
}
