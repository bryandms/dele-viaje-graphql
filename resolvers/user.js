import formatErrors from "../formatErrors.js";
import auth from "../auth.js";
import { isAuthenticatedResolver } from "../permissions.js";

export default {
  User: {
    id: root => root.id,

    favoritePlaces: ({ id }, args, { models }) =>
      models.sequelize.query("select * from get_fav_places(?)", {
        replacements: [id],
        model: models.Place,
        raw: true
      }),

    roles: ({ id }, args, { models }) =>
      models.sequelize.query("select * from get_roles(?)", {
        replacements: [id],
        model: models.Role,
        raw: true
      })
  },

  Query: {
    allUsers: isAuthenticatedResolver.createResolver((root, args, { models }) =>
      models.User.all()
    ),

    getUser: (root, { id }, { models }) =>
      models.User.findOne({ where: { id } })
  },

  Mutation: {
    login: async (root, { email, password }, { models: { User }, SECRET }) =>
      auth.login(email, password, User, SECRET),

    register: async (root, args, { models }) => {
      try {
        const user = await models.User.create(args.user);

        models.sequelize
          .query("select add_role(:roleId, :userId)", {
            replacements: { roleId: 3, userId: user.id },
            raw: true
          })
          .catch(error => {
            return {
              success: false,
              errors: formatErrors(error)
            };
          });

        return {
          success: user && user.id,
          errors: []
        };
      } catch (error) {
        return {
          success: false,
          errors: formatErrors(error)
        };
      }
    },

    addFavPlace: (root, { placeId, userId }, { models }) =>
      models.sequelize
        .query("select add_fav_place(:placeId, :userId)", {
          replacements: { placeId, userId },
          raw: true
        })
        .catch(err => {
          console.log(err);
          return false;
        }),

    removeFavPlace: (root, { placeId, userId }, { models }) =>
      models.sequelize
        .query("select remove_fav_place(:placeId, :userId)", {
          replacements: { placeId, userId },
          raw: true
        })
        .catch(err => {
          console.log(err);
          return false;
        }),

    addRole: (root, { roleId, userId }, { models }) =>
      models.sequelize
        .query("select add_role(:roleId, :userId)", {
          replacements: { roleId, userId },
          raw: true
        })
        .catch(err => {
          console.log(err);
          return false;
        }),

    removeRole: (root, { roleId, userId }, { models }) =>
      models.sequelize
        .query("select remove_role(:roleId, :userId)", {
          replacements: { roleId, userId },
          raw: true
        })
        .catch(err => {
          console.log(err);
          return false;
        })
  }
};
