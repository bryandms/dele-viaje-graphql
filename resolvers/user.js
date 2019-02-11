const formatErrors = require('../helpers/formatErrors')
const { isAuthenticatedResolver } = require('../helpers/permissions')
const { login } = require('../helpers/auth')
const baseController = require('../helpers/baseController')

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
        baseController.findByPk(db.User, id, 'user')
    ),

    users: isAuthenticatedResolver.createResolver(
      (parent, args, { db }, info) =>
        baseController.findAll(db.User)
    )
  },

  Mutation: {
    login: (parent, { email, password }, { db }, info) =>
      login(email, password, db.User),

    register: (parent, { user }, { db }, info) =>
      baseController.create(db.User, user),

    addFavPlace: isAuthenticatedResolver.createResolver(
      (parent, { userId, placeId }, { db }, info) =>
        baseController.addAssociation(db.User, userId, 'addPlace', placeId)
    ),

    removeFavPlace: isAuthenticatedResolver.createResolver(
      (parent, { userId, placeId }, { db }, info) =>
        baseController.removeAssociation(db.User, userId, 'removePlace', placeId)
    ),

    setRating: isAuthenticatedResolver.createResolver(
      (parent, { userPlacesId, rating }, { db }, info) =>
        db.UserPlaces.update(
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
          })
    ),

    addRole: isAuthenticatedResolver.createResolver(
      (parent, { userId, roleId }, { db }, info) =>
        baseController.addAssociation(db.User, userId, 'addRole', roleId)
    ),

    removeRole: isAuthenticatedResolver.createResolver(
      (parent, { userId, roleId }, { db }, info) =>
        baseController.removeAssociation(db.User, userId, 'removeRole', roleId)
    )
  }
}
