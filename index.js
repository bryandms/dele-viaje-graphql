const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas')
const path = require('path')
const cors = require('cors')
const db = require('./models')
const { middleware } = require('./helpers/auth')

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: ({req}) => {
    return {
      db,
      user: req.user
    }
  }
})

const app = express()
app.use(cors(), middleware)
server.applyMiddleware({ app })

const PORT = process.env.PORT

db.sequelize.sync({}).then(() => {
  app.listen(PORT, () =>
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  )
})
