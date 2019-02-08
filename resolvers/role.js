const formatErrors = require('../helpers/formatErrors')

module.exports = {
  Role: {
    users: async (parent, args, context, info) => await parent.getUsers()
  },

  Query: {
    roles: (parent, args, { db }, info) => db.Role.findAll()
  },

  Mutation: {
    createRole: (parent, args, { db }, info) => {
      return db.Role.create(args)
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

    deleteRole: (parent, { id }, { db }, info) => {
      return db.Role.destroy({ where: { id } })
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
