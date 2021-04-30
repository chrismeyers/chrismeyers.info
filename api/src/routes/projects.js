const S = require('fluent-json-schema');

module.exports = async (app) => {
  app.get('/projects', {
    schema: {
      response: {
        200: S.object().prop(
          'items',
          S.array().items(S.ref('schema#projectResponse')),
        ),
      },
    },
    handler: async (request, reply) => {
      try {
        const repo = request.diScope.resolve('projectRepository');
        return { items: await repo.active() };
      } catch (error) {
        return reply.internalServerError('Unable to load data');
      }
    },
  });

  app.get('/projects/:id', {
    schema: {
      params: S.object().prop('id', S.number().required()),
      response: {
        200: S.ref('schema#projectResponse'),
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;

      try {
        const repo = request.diScope.resolve('projectRepository');
        const project = await repo.findById(id);

        if (project) return project;

        return reply.notFound(`Project ${id} not found`);
      } catch (error) {
        return reply.internalServerError('Unable to load data');
      }
    },
  });
};
