module.exports = `
  union Data = Place | Role | Service | User | UserPlaces

  type Response {
    success: Boolean!
    data: [Data]
    token: String
    errors: [Error]
  }

  type SingleResponse {
    success: Boolean!
    data: Data
    token: String
    errors: [Error]
  }

  type Error {
    path: String!
    message: String!
  }
`
