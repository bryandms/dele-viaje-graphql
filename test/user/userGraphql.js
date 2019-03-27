const userQuery = `
  {
    user(id: 1) {
      id
      username
      email
      places {
        id
        name
      }
      roles {
        id
        name
      }
      userPlaces {
        id
      }
    }
  }
`

const usersQuery = `
  {
    users {
      id
      username
      email
      places {
        id
        name
      }
      roles {
        id
        name
      }
      userPlaces {
        id
        rating
      }
    }
  }
`

const loginMutation = `
  mutation {
    login (email: "admin@mail.com", password: "secret"){
      token
      user {
        id
      }
    }
  }
`

const registerMutation = `
  mutation {
    register (
      user: {
        username: "username"
        email: "username@mail.com"
        password: "secret"
      }
    ){
      token
      user {
        id
        username
      }
    }
  }
`

const addFavPlaceMutation = `
  mutation {
    addFavPlace (
      placeId: 1,
      userId: 1
    )
  }
`

const removeFavPlaceMutation = `
  mutation {
    removeFavPlace (
      placeId: 1,
      userId: 1
    )
  }
`

const setRatingMutation = `
  mutation {
    setRating(
      userPlacesId: 21
      rating: 5
    ){
      id
      rating
    }
  }
`

const addRoleMutation = `
  mutation {
    addRole(
      roleId: 1
      userId: 1
    )
  }
`

const removeRoleMutation = `
  mutation {
    removeRole(
      roleId: 1
      userId: 1
    )
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
