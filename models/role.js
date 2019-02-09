module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('role', {
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
      }
    },
    {
      freezeTableName: true
    }
  )

  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: 'UserRoles',
      as: 'users',
      foreignKey: 'userId'
    })
  }

  return Role
}
