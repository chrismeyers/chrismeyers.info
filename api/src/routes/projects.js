const dataLoader = require('../lib/data-loader');
const createProjectService = require('../lib/project-service');

module.exports = async (app) => {
  app.get('/projects', async (request, reply) => {
    try {
      const { projects } = await dataLoader();
      const service = createProjectService(projects);

      return { items: service.active() };
    } catch (error) {
      return reply.status(500).send({ error: 'Unable to load data file' });
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
        const { projects } = await dataLoader();
        const service = createProjectService(projects);
        const project = service.findById(id);

        if (project) return project;

        return reply.code(404).send({ message: `Project \`${id}\` not found` });
      } catch (error) {
        return reply.status(500).send({ error: 'Unable to load data file' });
      }
    },
  });
};
