const formatErrors = require('../helpers/formatErrors')

module.exports = {
  Service: {
    places: async (parent, args, context, info) => await parent.getPlaces()
  },

  Query: {
    service: (parent, { id }, { db }, info) => db.Service.findByPk(id),
    services: (parent, args, { db }, info) => db.Service.findAll()
  },

  Mutation: {
    createService: (parent, { service }, { db }, info) => {
      return db.Service.create(service)
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

    updateService: (parent, { id, service }, { db }, info) => {
      return db.Service.update(
          service,
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

    deleteService: (parent, { id }, { db }, info) => {
      return db.Service.destroy({ where: { id } })
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
    }
  }
}
