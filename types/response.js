module.exports = `
  union Data = Place | Role | Service | User

  type Response {
    success: Boolean!
    data: [Data]
    errors: [Error]
  }

  type Error {
    path: String!
    message: String!
  }
`
