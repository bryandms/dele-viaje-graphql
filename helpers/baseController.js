const formatErrors = require('./formatErrors')

module.exports = {
  findAll: (model) =>
    model.findAll()
      .then(data => {
        return {
          success: true,
          data,
          errors: []
        }
      })
      .catch(err => {
        return {
          success: false,
          data: [],
          errors: formatErrors(err)
        }
    }),

  findByPk: (model, id, modelName) =>
    model.findByPk(id)
      .then(data => {
        if (data) {
          return {
            success: true,
            data,
            errors: []
          }
        } else {
          return {
            success: false,
            data: null,
            errors: [{
              path: modelName,
              message: 'El recurso que ha solicitado no existe.'
            }]
          }
        }
      })
      .catch(err => {
        return {
          success: false,
          data: null,
          errors: formatErrors(err)
        }
      }),

  create: (model, args) =>
    model.create(args)
      .then(data => {
        return {
          success: true,
          data,
          errors: []
        }
      })
      .catch(err => {
        return {
          success: false,
          data: null,
          errors: formatErrors(err)
        }
      }),

  update: (model, id, args, modelName) =>
    model.update(
      args,
      {
        returning: true,
        where: { id }
      }
    )
      .then(([id, [data]]) => {
        if (data) {
          return {
            success: true,
            data,
            errors: []
          }
        } else {
          return {
            success: false,
            data: null,
            errors: [{
              path: modelName,
              message: 'El recurso que intenta actualizar no existe.'
            }]
          }
        }
      })
      .catch(err => {
        return {
          success: false,
          data: null,
          errors: formatErrors(err)
        }
      }),

  destroy: (model, id, modelName) =>
    model.destroy({ where: { id } })
      .then(data => {
        if (data) {
          return {
            success: true,
            data: null,
            errors: []
          }
        } else {
          return {
            success: false,
            data: null,
            errors: [{
              path: modelName,
              message: 'El recurso que intenta eliminar no existe.'
            }]
          }
        }
      })
      .catch(err => {
        return {
          success: false,
          data: null,
          errors: formatErrors(err)
        }
      }),

  addAssociation: (model, sourceId, association, targetId) =>
    model.findByPk(sourceId)
      .then(source =>
        source[association](targetId)
          .then(() => {
            return {
              success: true,
              data: null,
              errors: []
            }
          })
          .catch(err => {
            return {
              success: false,
              data: null,
              errors: formatErrors(err)
            }
          })
      )
      .catch(err => {
        return {
          success: false,
          data: null,
          errors: formatErrors(err)
        }
      }),

  removeAssociation: (model, sourceId, association, targetId) =>
    model.findByPk(sourceId)
      .then(source => {
        const res = source[association](targetId)
        return {
          success: res,
          data: null,
          errors: []
        }
      })
      .catch(err => {
        return {
          success: false,
          data: null,
          errors: formatErrors(err)
        }
      })
}
