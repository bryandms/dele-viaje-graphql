export default (sequelize, DataTypes) => {
  const Role = sequelize.define("role", {
    name: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Este rol ya se encuentra registrado."
      },
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El rol es requerido."
        }
      }
    }
  });

  Role.associate = models => {
    Role.belongsToMany(models.User, {
      through: "user_roles",
      foreignKey: {
        name: "roleId",
        field: "role_id"
      }
    });
  };

  return Role;
};
