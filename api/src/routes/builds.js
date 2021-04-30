const S = require('fluent-json-schema');

module.exports = async (app) => {
  app.get('/builds', {
    schema: {
      response: {
        200: S.object().prop(
          'items',
          S.array().items(S.ref('schema#buildResponse')),
        ),
      },
    },
    handler: async (request, reply) => {
      try {
        const repo = request.diScope.resolve('buildRepository');
        return { items: await repo.active() };
      } catch (error) {
        return reply.internalServerError('Unable to load data');
      }
    },
  });

  app.get('/builds/:id', {
    schema: {
      params: S.object().prop('id', S.number().required()),
      response: {
        200: S.ref('schema#buildResponse'),
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;

      try {
        const repo = request.diScope.resolve('buildRepository');
        const build = await repo.findById(id);

        if (build) return build;

        return reply.notFound(`Build ${id} not found`);
      } catch (error) {
        return reply.internalServerError('Unable to load data');
      }
    },
  });
};
