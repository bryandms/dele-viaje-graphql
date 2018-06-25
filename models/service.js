export default (sequelize, DataTypes) => {
  const Service = sequelize.define("service", {
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
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          args: true,
          msg: "El precio no es válido."
        }
      }
    },
    icon: DataTypes.STRING
  });

  Service.associate = models => {
    Service.belongsToMany(models.Place, {
      through: "place_services",
      foreignKey: {
        name: "serviceId",
        field: "service_id"
      }
    });
  };

  return Service;
};
