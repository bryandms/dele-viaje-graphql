const userQuery = `
  {
    user(id: 1) {
      success
      data {
        ... on User {
          id
          username
          email
          places {
            name
          }
          roles {
            name
          }
          userPlaces {
            rating
          }
        }
      }
      token
      errors {
        path
        message
      }
    }
  }
`

const usersQuery = `
  {
    users {
      success
      data {
        ... on User {
          id
          username
          email
          places {
            name
          }
          roles {
            name
          }
          userPlaces {
            id
            rating
          }
        }
      }
      token
      errors {
        path
        message
      }
    }
  }
`

const loginMutation = `
  mutation {
    login (
      email: "user@mail.com"
      password: "secret"
    ) {
      success
      data {
        ... on User {
          id
          username
          email
          roles {
            name
          }
          places {
            id
            name
            description
            latitude
            longitude
            province
            accessibility
            category
            score
            votes
            website
            phone
            email
            schedule
            photos
            services {
              id
              name
              icon
            }
            userPlaces {
              id
              rating
            }
          }
        }
      }
      token
      errors {
        path
        message
      }
    }
  }
`

const registerMutation = `
  mutation {
    register (
      user: {
        username: "user"
        email: "user0@mail.com"
        password: "secret"
      }
    ){
      success
      data {
        ... on User {
          id
          username
          email
        }
      }
      token
      errors {
        path
        message
      }
    }
  }
`

const addFavPlaceMutation = `
  mutation {
    addFavPlace(
      placeId: 1
      userId: 1
    ){
      success
      data {
        ... on User {
          username
          roles {
            name
          }
        }
      }
      token
      errors {
        path
        message
      }
    }
  }
`

const removeFavPlaceMutation = `
  mutation {
    removeFavPlace(
      placeId: 2
      userId: 3
    ){
      success
      data {
        ... on User {
          username
          roles {
            name
          }
        }
      }
      token
      errors {
        path
        message
      }
    }
  }
`

const setRatingMutation = `
  mutation {
    setRating(
      userPlacesId: 1
      rating: 4.7
    ){
      success
      data {
        ... on UserPlaces {
          id
          rating
        }
      }
      token
      errors {
        path
        message
      }
    }
  }
`

const addRoleMutation = `
  mutation {
    addRole(
      roleId: 1
      userId: 1
    ){
      success
      data {
        ... on User {
          username
          roles {
            name
          }
        }
      }
      token
      errors {
        path
        message
      }
    }
  }
`

const removeRoleMutation = `
  mutation {
    removeRole(
      roleId: 1
      userId: 1
    ){
      success
      data {
        ... on User {
          username
          roles {
            name
          }
        }
      }
      token
      errors {
        path
        message
      }
    }
  }
`

module.exports = {
  userQuery,
  usersQuery,
  loginMutation,
  registerMutation,
  addFavPlaceMutation,
  removeFavPlaceMutation,
  setRatingMutation,
  addRoleMutation,
  removeRoleMutation
}
