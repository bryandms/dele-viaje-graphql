const { isAuthenticatedResolver } = require('../helpers/permissions')
const baseController = require('../helpers/baseController')

module.exports = {
  Service: {
    places: async (parent, args, context, info) => await parent.getPlaces()
  },

  Query: {
    service: isAuthenticatedResolver.createResolver(
      (parent, { id }, { db }, info) =>
        baseController.findByPk(db.Service, id, 'service')
    ),

    services: isAuthenticatedResolver.createResolver(
      (parent, args, { db }, info) =>
        baseController.findAll(db.Service)
    )
  },

  Mutation: {
    createService: isAuthenticatedResolver.createResolver(
      (parent, { service }, { db }, info) =>
        baseController.create(db.Service, service)
    ),

    updateService: isAuthenticatedResolver.createResolver(
      (parent, { id, service }, { db }, info) =>
        baseController.update(db.Service, id, service, 'service')
    ),

    deleteService: isAuthenticatedResolver.createResolver(
      (parent, { id }, { db }, info) =>
        baseController.destroy(db.Service, id, 'service')
    )
  }
}
