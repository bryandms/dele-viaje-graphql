const formatErrors = require('../helpers/formatErrors')

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
          const res = user.addPlace(placeId, { through: { rating: 0.0 }})
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

    setRating: async (parent, { userPlacesId, rating }, { db }, info) => {
      return await db.UserPlaces.update(
        { rating },
        {
          returning: true,
          where: { id: userPlacesId }
        }
      )
      .then(([id, [data]]) => data.rating)
      .catch((err) => {
        console.log('Error', err)
        return -1
      })
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
