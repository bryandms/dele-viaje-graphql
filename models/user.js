const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'Este username ya se encuentra registrado.'
        },
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'El username es requerido.'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'Este correo ya se encuentra registrado.'
        },
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'El correo es requerido.'
          },
          isEmail: {
            args: true,
            msg: 'El correo no es válido.'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'La contraseña es requerida.'
          }
        }
      }
    },
    {
      hooks: {
        afterValidate: async user => {
          const hashedPassword = await bcrypt.hash(user.password, 12)
          user.password = hashedPassword
        }
      }
    },
    {
      freezeTableName: true
    }
  )

  User.associate = (models) => {
    User.belongsToMany(models.Place, {
      through: models.UserPlaces,
      as: 'places',
      foreignKey: 'placeId'
    })

    User.belongsToMany(models.Role, {
      through: 'UserRoles',
      as: 'roles',
      foreignKey: 'roleId'
    })
  }

  return User
}
