module.exports = {
  Role: {
    id: root => root.id,

    users: ({ id }, args, { models }) =>
      models.sequelize.query("select * from get_users_with_this_role(?)", {
        replacements: [id],
        model: models.User,
        raw: true
      })
  },

  Query: {
    allRoles: (root, args, { models }) => models.Role.findAll()
  },

  Mutation: {
    createRole: (root, args, { models }) => models.Role.create(args),

    deleteRole: (root, { id }, { models }) =>
      models.Role.destroy({ where: { id } })
  }
};
