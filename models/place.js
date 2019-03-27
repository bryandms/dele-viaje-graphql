module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('place', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'Este nombre ya se encuentra registrado.'
        },
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'El nombre es requerido.'
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'La descripción es requerida.'
          }
        }
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: {
            args: true,
            msg: 'La latitud no es válida.'
          }
        }
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: {
            args: true,
            msg: 'La longitud no es válida.'
          }
        }
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'La provincia es requerida.'
          }
        }
      },
      accessibility: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'La accesibilidad es requerida.'
          }
        }
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'La categoría es requerida.'
          }
        }
      },
      score: {
        type: DataTypes.DOUBLE,
        defaultValue: 0
      },
      votes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      website: DataTypes.STRING,
      phone: DataTypes.INTEGER,
      email: DataTypes.STRING,
      schedule: {
        type: DataTypes.JSON,
        defaultValue: {}
      },
      photos: {
        type: DataTypes.JSON,
        defaultValue: {}
      }
    },
    {
      freezeTableName: true
    }
  )

  Place.associate = (models) => {
    Place.belongsToMany(models.User, {
      through: models.UserPlaces,
      as: 'users',
      foreignKey: 'userId'
    })

    Place.belongsToMany(models.Service, {
      through: 'PlaceServices',
      as: 'services',
      foreignKey: 'serviceId'
    })
  }

  return Place
}
