const Sequelize = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const host = process.env.DB_HOST
const database = process.env.DB_DATABASE
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
})

const db = {
  User: sequelize.import('./user'),
  Place: sequelize.import('./place'),
  Role: sequelize.import('./role'),
  Service: sequelize.import('./service'),
  UserPlaces: sequelize.import('./userPlaces')
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
