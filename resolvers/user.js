const formatErrors = require('../helpers/formatErrors')
const { isAuthenticatedResolver } = require('../helpers/permissions')
const { login } = require('../helpers/auth')

module.exports = {
  User: {
    places: async (parent, args, context, info) => await parent.getPlaces(),
    roles: async (parent, args, context, info) => await parent.getRoles(),
    userPlaces: async (parent, args, context, info) => await parent.getPlaces()
      .then(places => {
        return places.map(place => place.dataValues.UserPlaces)
      })
  },

  Query: {
    user: isAuthenticatedResolver.createResolver(
      (parent, { id }, { db }, info) =>
        db.User.findByPk(id)
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

    users: isAuthenticatedResolver.createResolver(
      (parent, args, { db }, info) =>
        db.User.findAll()
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
    login: (parent, { email, password }, { db }, info) => login(email, password, db.User),

    register: (parent, { user }, { db }, info) =>
      db.User.create(user)
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
        }),

    addFavPlace: async (parent, { userId, placeId }, { db }, info) =>
      await db.User.findByPk(userId)
        .then(user =>
          user.addPlace(placeId, { through: { rating: 0.0 }})
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
        }),

    removeFavPlace: async (parent, { userId, placeId }, { db }, info) =>
      await db.User.findByPk(userId)
        .then(user => {
          const res = user.removePlace(placeId)
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
        }),

    setRating: async (parent, { userPlacesId, rating }, { db }, info) =>
      await db.UserPlaces.update(
        { rating },
        {
          returning: true,
          where: { id: userPlacesId }
        }
      )
        .then(([id, [userPlace]]) => {
          return {
            success: true,
            data: userPlace,
            errors: []
          }
        })
        .catch(err => {
          return {
            success: false,
            data: null,
            errors: formatErrors(err)
          }
        }),

    addRole: async (parent, { userId, roleId }, { db }, info) =>
      await db.User.findByPk(userId)
        .then(user =>
          user.addRole(roleId)
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
        }),

    removeRole: async (parent, { userId, roleId }, { db }, info) =>
      await db.User.findByPk(userId)
        .then(user => {
          const res = user.removeRole(roleId)
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
  }
}
