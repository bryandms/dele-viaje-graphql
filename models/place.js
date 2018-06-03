export default (sequelize, DataTypes) => {
  const Place = sequelize.define("place", {
    name: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Este nombre ya se encuentra registrado."
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre es requerido."
        }
      }
    },
    description: DataTypes.STRING,
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          args: true,
          msg: "La latitud no es válida."
        }
      }
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          args: true,
          msg: "La longitud no es válida."
        }
      }
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La provincia es requerida."
        }
      }
    },
    accessibility: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La accesibilidad es requerida."
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La categoría es requerida."
        }
      }
    },
    score: {
      type: DataTypes.DOUBLE,
      default: 0
    },
    numberOfVotes: {
      field: "number_of_votes",
      type: DataTypes.INTEGER,
      default: 0
    },
    websiteUrl: {
      field: "website_url",
      type: DataTypes.STRING
    },
    phone: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    email: DataTypes.STRING,
    schedule: DataTypes.JSON,
    photos: DataTypes.JSON
  });

  Place.associate = models => {
    Place.belongsToMany(models.User, {
      through: "favorite_places",
      foreignKey: {
        name: "placeId",
        field: "place_id"
      }
    });

    Place.belongsToMany(models.Service, {
      through: "place_services",
      foreignKey: {
        name: "placeId",
        field: "place_id"
      }
    });
  };

  return Place;
};
