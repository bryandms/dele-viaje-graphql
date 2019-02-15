const dotenv = require('dotenv')
dotenv.config()

const path = require('path')
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas')
const { makeExecutableSchema } = require('graphql-tools')
const placeTest = require('./place/place.test')
const roleTest = require('./role/role.test')
const serviceTest = require('./service/service.test')
const userTest = require('./user/user.test')

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, '../types')))
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, '../resolvers'))
)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

placeTest(schema)
roleTest(schema)
serviceTest(schema)
userTest(schema)
