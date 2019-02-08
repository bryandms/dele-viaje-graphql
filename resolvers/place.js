const formatErrors = require('../helpers/formatErrors')

module.exports = {
  Place: {
    users: async (parent, args, context, info) => await parent.getUsers(),
    services: async (parent, args, context, info) => await parent.getServices()
  },

  Query: {
    place: (parent, { id }, { db }, info) => db.Place.findByPk(id),
    places: (parent, args, { db }, info) => db.Place.findAll()
  },

  Mutation: {
    createPlace: (parent, { place }, { db }, info) => {
      return db.Place.create(place)
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

    updatePlace: (parent, { id, place }, { db }, info) => {
      return db.Place.update(
        place,
        {
          returning: true,
          where: { id }
        }
      )
      .then(([id, [data]]) => {
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

    deletePlace: (parent, { id }, { db }, info) => {
      return db.Place.destroy({ where: { id } })
        .then((data) => {
          return {
            success: data,
            data: [],
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

    addService: async (parent, { serviceId, placeId }, { db }, info) => {
      const res = await db.Place.findByPk(placeId)
        .then((place) => {
          const res = place.addService(serviceId)
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

    removeService: async (parent, { serviceId, placeId }, { db }, info) => {
      const res = await db.Place.findByPk(placeId)
        .then((place) => {
          const res = place.removeService(serviceId)
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
