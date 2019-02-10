const formatErrors = require('../helpers/formatErrors')
const { isAuthenticatedResolver } = require('../helpers/permissions')

module.exports = {
  Service: {
    places: async (parent, args, context, info) => await parent.getPlaces()
  },

  Query: {
    service: isAuthenticatedResolver.createResolver(
      (parent, { id }, { db }, info) =>
        db.Service.findByPk(id)
          .then(data => {
            if (data) {
              return {
                success: true,
                data: data,
                errors: []
              }
            } else {
              return {
                success: false,
                data: null,
                errors: [{
                  path: 'service',
                  message: 'El servicio que ha solicitado no existe.'
                }]
              }
            }
          })
          .catch(err => {
            return {
              success: false,
              data: null,
              errors: formatErrors(err)
            }
          })
    ),

    services: isAuthenticatedResolver.createResolver(
      (parent, args, { db }, info) =>
        db.Service.findAll()
          .then(data => {
            return {
              success: true,
              data: data,
              errors: []
            }
          })
          .catch(err => {
            return {
              success: false,
              data: [],
              errors: formatErrors(err)
            }
          })
    )
  },

  Mutation: {
    createService: isAuthenticatedResolver.createResolver(
      (parent, { service }, { db }, info) =>
        db.Service.create(service)
          .then(data => {
            return {
              success: true,
              data: data,
              errors: []
            }
          })
          .catch(err => {
            return {
              success: false,
              data: null,
              errors: formatErrors(err)
            }
          })
    ),

    updateService: isAuthenticatedResolver.createResolver(
      (parent, { id, service }, { db }, info) =>
        db.Service.update(
          service,
          {
            returning: true,
            where: { id }
          }
        )
          .then(([id, [data]]) => {
            if (data) {
              return {
                success: true,
                data: data,
                errors: []
              }
            } else {
              return {
                success: false,
                data: null,
                errors: [{
                  path: 'service',
                  message: 'El servicio que intenta actualizar no existe.'
                }]
              }
            }
          })
          .catch(err => {
            return {
              success: false,
              data: null,
              errors: formatErrors(err)
            }
          })
    ),

    deleteService: isAuthenticatedResolver.createResolver(
      (parent, { id }, { db }, info) =>
        db.Service.destroy({ where: { id } })
          .then(data => {
            return {
              success: data,
              data: null,
              errors: []
            }
          })
          .catch(err => {
            return {
              success: false,
              data: null,
              errors: formatErrors(err)
            }
          })
    )
  }
}
