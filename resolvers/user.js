export default {
  User: {
    id: root => root.id,

    favoritePlaces: ({ id }, args, { models }) =>
      models.sequelize.query("select * from get_fav_places(?)", {
        replacements: [id],
        model: models.Place,
        raw: true
      })
  },

  Query: {
    allUsers: async (root, args, { models }) => models.User.all(),
    getUser: async (root, { id }, { models }) =>
      models.User.findOne({ where: { id } })
  },

  Mutation: {
    register: async (root, args, { models }) => models.User.create(args.user),

    addFavPlace: async (root, { placeId, userId }, { models }) =>
      models.sequelize
        .query("select add_fav_place(:placeId, :userId)", {
          replacements: { placeId, userId },
          raw: true
        })
        .catch(err => {
          console.log(err);
          return false;
        }),

    removeFavPlace: async (root, { placeId, userId }, { models }) =>
      models.sequelize
        .query("select remove_fav_place(:placeId, :userId)", {
          replacements: { placeId, userId },
          raw: true
        })
        .catch(err => {
          console.log(err);
          return false;
        })
  }
};
