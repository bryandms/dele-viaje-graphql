const findPlacesQuery = `
  {
    findPlaces (
      place: {
        province: "cartago"
        accessibility: "Lastre"
        category: "Familiar"
      }
    ){
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
      users {
        id
        username
      }
      services {
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

const placeQuery = `
  {
    place(id: 1) {
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
      users {
        id
        username
      }
      services {
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

const placesQuery = `
  {
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
      users {
        id
        username
      }
      services {
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

const createPlaceMutation = `
  mutation {
    createPlace(
      place: {
        name: "El Parque Ambiental Municipal Río Loro"
        description: "Alberga una naciente de agua cuya producción es de aproximadamente 60 litros por segundo."
        latitude: 9.9091989
        longitude: -83.9434624
        province: "Cartago"
        accessibility: "Lastre"
        category: "Familiar"
        website: "http://www.muni-carta.go.cr/ambiente/rio-loro/"
        phone: 25371200
        email: "parqueambiental@gmail.com"
        schedule: {
          miercoles: {
            abre: "8:00"
            cierra: "3:00"
          },
          jueves: {
            abre: "8:00"
            cierra: "3:00"
          },
          viernes: {
            abre: "8:00"
            cierra: "3:00"
          },
          sabado: {
            abre: "8:00"
            cierra: "3:00"
          },
          domingo: {
            abre: "8:00"
            cierra: "3:00"
          }
        }
        photos: [
          "https://www.nacion.com/resizer/uWbuiIcALYRB1qtrZMlaiXMK5f0=/600x0/center/middle/filters:quality(100)/arc-anglerfish-arc2-prod-gruponacion.s3.amazonaws.com/public/GYPNDIIYRFFDFINUK5VAWHSHYA.jpg"
        ]
      }
    ){
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
      users {
        id
        username
      }
      services {
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

const updatePlaceMutation = `
  mutation {
    updatePlace(
      id: 1
      place: {
        name: "El Parque Ambiental Municipal Río Loro"
        description: "Alberga una naciente de agua cuya producción es de aproximadamente 60 litros por segundo."
        latitude: 9.9091989
        longitude: -83.9434624
        province: "Cartago"
        accessibility: "Lastre"
        category: "Familiar"
        website: "http://www.muni-carta.go.cr/ambiente/rio-loro/"
        phone: 25371200
        email: "parqueambiental@gmail.com"
        schedule: {
          miercoles: {
            abre: "8:00"
            cierra: "3:00"
          },
          jueves: {
            abre: "8:00"
            cierra: "3:00"
          },
          viernes: {
            abre: "8:00"
            cierra: "3:00"
          },
          sabado: {
            abre: "8:00"
            cierra: "3:00"
          },
          domingo: {
            abre: "8:00"
            cierra: "3:00"
          }
        }
        photos: [
          "https://www.nacion.com/resizer/uWbuiIcALYRB1qtrZMlaiXMK5f0=/600x0/center/middle/filters:quality(100)/arc-anglerfish-arc2-prod-gruponacion.s3.amazonaws.com/public/GYPNDIIYRFFDFINUK5VAWHSHYA.jpg"
        ]
      }
    ){
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
      users {
        id
        username
      }
      services {
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

const deletePlaceMutation = `
  mutation {
    deletePlace(id: 5)
  }
`

const addServiceMutation = `
  mutation {
    addService (
      serviceId: 1
      placeId: 1
    )
  }
`

const removeServiceMutation = `
  mutation {
    removeService (
      serviceId: 1
      placeId: 1
    )
  }
`

module.exports = {
  findPlacesQuery,
  placeQuery,
  placesQuery,
  createPlaceMutation,
  updatePlaceMutation,
  deletePlaceMutation,
  addServiceMutation,
  removeServiceMutation
}
