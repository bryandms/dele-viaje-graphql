import algorithms from "../algorithms";

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
    allPlaces: (root, args, { models }) => models.Place.findAll(),

    getPlace: (root, { id }, { models }) =>
      models.Place.findOne({ where: { id } }),

    findPlaces: (root, args, { models }) =>
      models.Place.findAll()
        .then(places => {
          return algorithms.euclidean(args.place, places);
        })
        .catch(error => {
          return [];
        })
  },

  Mutation: {
    createPlace: (root, args, { models }) => models.Place.create(args.place),

    updatePlace: (root, args, { models }) =>
      models.Place.update(args.place, { where: { id: args.id } }).then(() =>
        models.Place.findOne({ where: { id: args.id } })
      ),

    deletePlace: (root, { id }, { models }) =>
      models.Place.destroy({ where: { id } }),

    addService: (root, { serviceId, placeId }, { models }) =>
      models.sequelize
        .query("select add_service(:serviceId, :placeId)", {
          replacements: { serviceId, placeId },
          raw: true
        })
        .catch(err => {
          console.log(err);
          return false;
        }),

    removeService: (root, { serviceId, placeId }, { models }) =>
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
