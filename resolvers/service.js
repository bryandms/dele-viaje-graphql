module.exports = {
  Service: {
    id: root => root.id,

    places: ({ id }, args, { models }) =>
      models.sequelize.query("select * from get_places(?)", {
        replacements: [id],
        model: models.Place,
        raw: true
      })
  },

  Query: {
    allServices: async (root, args, { models }) => models.Service.findAll(),
    getService: async (root, { id }, { models }) =>
      models.Service.findOne({ where: { id } })
  },

  Mutation: {
    createService: async (root, args, { models }) =>
      models.Service.create(args.service),

    updateService: async (root, args, { models }) =>
      models.Service.update(args.service, { where: { id: args.id } }).then(() =>
        models.Service.findOne({ where: { id: args.id } })
      ),

    deleteService: async (root, { id }, { models }) =>
      models.Service.destroy({ where: { id } })
  }
};
