const formatErrors = require('../helpers/formatErrors')
const { isAuthenticatedResolver } = require('../helpers/permissions')

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
    place: isAuthenticatedResolver.createResolver(
      (parent, { id }, { db }, info) =>
        db.Place.findByPk(id)
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

    places: isAuthenticatedResolver.createResolver(
      (parent, args, { db }, info) =>
        db.Place.findAll()
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
    createPlace: isAuthenticatedResolver.createResolver(
      (parent, { place }, { db }, info) =>
        db.Place.create(place)
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

    updatePlace: isAuthenticatedResolver.createResolver(
      (parent, { id, place }, { db }, info) =>
        db.Place.update(
          place,
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
                errors: []
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

    deletePlace: isAuthenticatedResolver.createResolver(
      (parent, { id }, { db }, info) =>
        db.Place.destroy({ where: { id } })
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
    ),

    addService: isAuthenticatedResolver.createResolver(
      async (parent, { serviceId, placeId }, { db }, info) =>
        await db.Place.findByPk(placeId)
          .then(place =>
            place.addService(serviceId)
              .then(() => {
                return {
                  success: true,
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
          .catch(err => {
            return {
              success: false,
              data: null,
              errors: formatErrors(err)
            }
          })
    ),

    removeService: isAuthenticatedResolver.createResolver(
      async (parent, { serviceId, placeId }, { db }, info) =>
        await db.Place.findByPk(placeId)
          .then(place => {
            const res = place.removeService(serviceId)
            return {
              success: res,
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
