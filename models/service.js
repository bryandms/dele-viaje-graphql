module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('service', {
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
      icon: DataTypes.STRING
    },
    {
      freezeTableName: true
    }
  )

  Service.associate = (models) => {
    Service.belongsToMany(models.Place, {
      through: 'PlaceServices',
      as: 'places',
      foreignKey: 'PlaceId'
    })
  }

  return Service
}
