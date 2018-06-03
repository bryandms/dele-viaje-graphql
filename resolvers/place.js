module.exports = {
  Place: {
    id: root => root.id,

    services: ({ id }, args, { models }) =>
      models.sequelize.query("select * from get_services(?)", {
        replacements: [id],
        model: models.Service,
        raw: true
      }),

    users: ({ id }, args, { models }) =>
      models.sequelize.query("select * from get_users(?)", {
        replacements: [id],
        model: models.Service,
        raw: true
      })
  },

  Query: {
    allPlaces: async (root, args, { models }) => models.Place.findAll(),

    getPlace: async (root, { id }, { models }) =>
      models.Place.findOne({ where: { id } })
  },

  Mutation: {
    createPlace: async (root, args, { models }) =>
      models.Place.create(args.place),

    updatePlace: async (root, args, { models }) =>
      models.Place.update(args.place, { where: { id: args.id } }).then(() =>
        models.Place.findOne({ where: { id: args.id } })
      ),

    deletePlace: async (root, { id }, { models }) =>
      models.Place.destroy({ where: { id } }),

    addService: async (root, { serviceId, placeId }, { models }) =>
      models.sequelize
        .query("select add_service(:serviceId, :placeId)", {
          replacements: { serviceId, placeId },
          raw: true
        })
        .catch(err => {
          console.log(err);
          return false;
        }),

    removeService: async (root, { serviceId, placeId }, { models }) =>
      models.sequelize
        .query("select remove_service(:serviceId, :placeId)", {
          replacements: { serviceId, placeId },
          raw: true
        })
        .catch(err => {
          console.log(err);
          return false;
        })
  }
};
