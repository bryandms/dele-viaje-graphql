const { isAuthenticatedResolver } = require('../helpers/permissions')
const baseController = require('../helpers/baseController')

module.exports = {
  Role: {
    users: async (parent, args, context, info) => await parent.getUsers()
  },

  Query: {
    roles: isAuthenticatedResolver.createResolver(
      (parent, args, { db }, info) =>
        baseController.findAll(db.Role)
    )
  },

  Mutation: {
    createRole: isAuthenticatedResolver.createResolver(
      (parent, args, { db }, info) =>
        baseController.create(db.Role, args)
    ),

    deleteRole: isAuthenticatedResolver.createResolver(
      (parent, { id }, { db }, info) =>
        baseController.destroy(db.Role, id, 'role')
    )
  }
}
