const formatErrors = require('../helpers/formatErrors')
const { isAuthenticatedResolver } = require('../helpers/permissions')

module.exports = {
  Role: {
    users: async (parent, args, context, info) => await parent.getUsers()
  },

  Query: {
    roles: isAuthenticatedResolver.createResolver(
      async (parent, args, { db }, info) =>
        db.Role.findAll()
          .then(data => {
            return {
              success: true,
              data,
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
    createRole: isAuthenticatedResolver.createResolver(
      (parent, args, { db }, info) =>
        db.Role.create(args)
          .then(data => {
            return {
              success: true,
              data,
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

    deleteRole: isAuthenticatedResolver.createResolver(
      (parent, { id }, { db }, info) =>
        db.Role.destroy({ where: { id } })
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
