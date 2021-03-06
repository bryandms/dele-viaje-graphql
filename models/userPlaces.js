module.exports = (sequelize, DataTypes) => {
  const UserPlaces = sequelize.define('UserPlaces', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
      }
    }
  )

  return UserPlaces
}
