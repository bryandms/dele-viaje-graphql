const jwtMiddleware = require('express-jwt')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const auth = {
  middleware: jwtMiddleware({
    secret: process.env.SECRET,
    credentialsRequired: false
  }),

  getToken: ({ id, email }) => {
    return jwt.sign(
      { id, email },
      process.env.SECRET,
      { expiresIn: '1d' }
    )
  },

  login: async (email, password, User) => {
    const user = await User.findOne({ where: { email } })

    if (!user) {
      return {
        success: false,
        data: null,
        errors: [{
          path: 'email',
          message: 'Las credenciales son incorrectas.'
        }]
      }
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return {
        success: false,
        data: null,
        errors: [{
          path: 'email',
          message: 'Las credenciales son incorrectas.'
        }]
      }
    }

    const token = auth.getToken(user)

    return {
      success: true,
      data: user,
      errors: [],
      token
    }
  }
}

module.exports = auth
