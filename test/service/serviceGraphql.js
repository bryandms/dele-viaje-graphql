const serviceQuery = `
  {
    service(id: 1) {
      success
      data {
        ... on Service {
          id
          name
          icon
          places {
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

const servicesQuery = `
  {
    services {
      success
      data {
        ... on Service {
          id
          name
          icon
          places {
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

const createServiceMutation = `
  mutation {
    createService (
      service: {
        name: "Wifi"
        icon: "wifi"
      }
    ){
      success
      data {
        ... on Service {
          id
          name
          icon
          places {
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

const updateServiceMutation = `
  mutation {
    updateService (
      id: 1
      service: {
        name: "Wifi"
        icon: "wifi icon"
      }
    ){
      success
      data {
        ... on Service {
          id
          name
          icon
          places {
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

const deleteServiceMutation = `
  mutation {
    deleteService (
      id: 1
    ){
      success
      data {
        ... on Service {
          id
          name
          icon
          places {
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
  serviceQuery,
  servicesQuery,
  createServiceMutation,
  updateServiceMutation,
  deleteServiceMutation
}
