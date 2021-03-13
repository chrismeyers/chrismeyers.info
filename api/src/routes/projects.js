const dataLoader = require('../lib/data-loader');

module.exports = async (app) => {
  app.get('/projects', async (request, reply) => {
    try {
      let { projects } = await dataLoader();
      projects = projects.filter((p) => p.active);

      return { items: projects };
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
        const project = projects.find((p) => p.id === id && p.active);

        if (project) return project;

        return reply.code(404).send({ message: `Project \`${id}\` not found` });
      } catch (error) {
        return reply.status(500).send({ error: 'Unable to load data file' });
      }
    },
  });
};
