const serviceQuery = `
  {
    service(id: 1) {
      id
      name
      icon
      places {
        id
        name
      }
    }
  }
`

const servicesQuery = `
  {
    services {
      id
      name
      icon
      places {
        id
        name
      }
    }
  }
`

const createServiceMutation = `
  mutation {
    createService (
      service: {
        name: "test"
        icon: "test"
      }
    ){
      id
      name
    }
  }
`

const updateServiceMutation = `
  mutation {
    updateService (
      id:3
      service: {
        name: "test 1"
        icon: "test 1"
      }
    ){
      id
      name
    }
  }
`

const deleteServiceMutation = `
  mutation {
    deleteService (id:3)
  }
`
module.exports = {
  serviceQuery,
  servicesQuery,
  createServiceMutation,
  updateServiceMutation,
  deleteServiceMutation
}
