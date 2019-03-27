module.exports = {
  findAll: (model) => model.findAll(),

  findByPk: (model, id, modelName) => model.findByPk(id),

  create: (model, args) => model.create(args),

  update: (model, id, args, modelName) =>
    model.update(
      args,
      {
        returning: true,
        where: { id }
      }
    ).then(([id, [data]]) => data),

  destroy: (model, id, modelName) => model.destroy({ where: { id } }),

  addAssociation: (model, sourceId, association, targetId) =>
    model.findByPk(sourceId)
      .then(source => source[association](targetId)
        .then(() => true)
        .catch(() => false)
      )
      .catch(() => false),

  removeAssociation: (model, sourceId, association, targetId) =>
    model.findByPk(sourceId)
      .then(source => source[association](targetId))
      .catch(() => false),
}
