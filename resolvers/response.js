module.exports = {
  Data: {
    __resolveType: (obj) => {
      const name = obj._modelOptions.name.singular
      if (name == 'place') return 'Place'
      else if (name == 'role') return 'Role'
      else if (name == 'service') return 'Service'
      else if (name == 'user') return 'User'
      else if (name == 'UserPlace') return 'UserPlaces'
    }
  }
}
