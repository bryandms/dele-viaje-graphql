const { createResolver } = require('apollo-resolvers')

const baseResolver = createResolver(
  null,
  (parent, args, context, error) => error
)

const isAuthenticatedResolver = baseResolver.createResolver(
  (parent, args, { user }) => {
    if (!user)
      throw new Error('No estás autenticado.')
  }
)

module.exports = {
  baseResolver,
  isAuthenticatedResolver
}
