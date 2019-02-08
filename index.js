const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express')
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas')
const path = require('path')
const db = require('./models')

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types')))
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

const server = new ApolloServer({
  typeDefs: gql(typeDefs),
  resolvers,
  context: { db }
})

const app = express()
server.applyMiddleware({ app })

db.sequelize.sync({}).then(() => {
  app.listen(process.env.PORT, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  )
})
