const dataLoader = require('../lib/data-loader');
const createProjectService = require('../lib/project-service');

module.exports = async (app) => {
  app.get('/projects', async (request, reply) => {
    try {
      const service = createProjectService(dataLoader);
      return { items: await service.active() };
    } catch (error) {
      return reply.internalServerError('Unable to load data');
    }
  });

  app.get('/projects/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;

      try {
        const service = createProjectService(dataLoader);
        const project = await service.findById(id);

        if (project) return project;

        return reply.notFound(`Project ${id} not found`);
      } catch (error) {
        return reply.internalServerError('Unable to load data');
      }
    },
  });
};
