const formatErrors = require('../helpers/formatErrors')

module.exports = {
  User: {
    places: async (parent, args, context, info) => await parent.getPlaces(),
    roles: async (parent, args, context, info) => await parent.getRoles()
  },

  Query: {
    user: (parent, { id }, { db }, info) => db.User.findByPk(id),
    users: (parent, args, { db }, info) => db.User.findAll()
  },

  Mutation: {
    login: (parent, args, { db }, info) => {
      // TODO: implement the login with jwt
      return false
    },

    register: (parent, { user }, { db }, info) => {
      return db.User.create(user)
        .then((data) => {
          return {
            success: true,
            data: [data],
            errors: []
          }
        })
        .catch((err) => {
          return {
            success: false,
            data: [],
            errors: formatErrors(err)
          }
        })
    },

    addFavPlace: async (parent, { userId, placeId }, { db }, info) => {
      const res = await db.User.findByPk(userId)
        .then((user) => {
          const res = user.addPlace(placeId)
            .then(() => {
              return true
            })
            .catch((err) => {
              console.log('Error', err)
              return false
            })
            return res
        })
        .catch((err) => {
          console.log('Error', err)
          return false
        })

      return res
    },

    removeFavPlace: async (parent, { userId, placeId }, { db }, info) => {
      const res = await db.User.findByPk(userId)
        .then((user) => {
          const res = user.removePlace(placeId)
          return res
        })
        .catch((err) => {
          console.log('Error', err)
          return false
        })

      return res
    },

    addRole: async (parent, { userId, roleId }, { db }, info) => {
      const res = await db.User.findByPk(userId)
        .then((user) => {
          const res = user.addRole(roleId)
            .then(() => {
              return true
            })
            .catch((err) => {
              console.log('Error', err)
              return false
            })
            return res
        })
        .catch((err) => {
          console.log('Error', err)
          return false
        })

      return res
    },

    removeRole: async (parent, { userId, roleId }, { db }, info) => {
      const res = await db.User.findByPk(userId)
        .then((user) => {
          const res = user.removeRole(roleId)
          return res
        })
        .catch((err) => {
          console.log('Error', err)
          return false
        })

      return res
    }
  }
}
