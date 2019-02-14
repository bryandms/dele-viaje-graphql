module.exports = `
  union Data = Place | Role | Service | User | UserPlaces

  "A type that describes the response where data is an array."
  type Response {
    "The response' success, true if successful, false if failed."
    success: Boolean!
    "The response' data."
    data: [Data]
    "The response' token, if is necessary."
    token: String
    "The response' errors."
    errors: [Error]
  }

  "A type that describes the response where data is an object."
  type SingleResponse {
    "The response' success, true if successful, false if failed."
    success: Boolean!
    "The response' data."
    data: Data
    "The response' token, if is necessary."
    token: String
    "The response' errors."
    errors: [Error]
  }

  "A type that describes the error."
  type Error {
    "The error path."
    path: String!
    "The error message."
    message: String!
  }
`
