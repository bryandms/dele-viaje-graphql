import bcrypt from "bcrypt";

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Este username ya se encuentra registrado."
        },
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "El username es requerido."
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Este correo ya se encuentra registrado."
        },
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "El correo es requerido."
          },
          isEmail: {
            args: true,
            msg: "El correo no es válido."
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "La contraseña es requerida."
          }
        }
      },
      gender: {
        type: DataTypes.ENUM("M", "F"),
        allowNull: false
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      hooks: {
        afterValidate: async user => {
          const hashedPassword = await bcrypt.hash(user.password, 12);
          user.password = hashedPassword;
        }
      }
    }
  );

  User.associate = models => {
    User.belongsToMany(models.Place, {
      through: "favorite_places",
      foreignKey: {
        name: "userId",
        field: "user_id"
      }
    });
  };

  return User;
};
