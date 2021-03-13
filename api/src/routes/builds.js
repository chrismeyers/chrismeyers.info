const dataLoader = require('../lib/data-loader');

module.exports = async (app) => {
  app.get('/builds', async (request, reply) => {
    try {
      let { builds } = await dataLoader();
      builds = builds.filter((b) => b.active);

      return { items: builds };
    } catch (error) {
      return reply.status(500).send({ error: 'Unable to load data file' });
    }
  });

  app.get('/builds/:id', {
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
        const { builds } = await dataLoader();
        const build = builds.find((b) => b.id === id && b.active);

        if (build) return build;

        return reply.code(404).send({ message: `Build \`${id}\` not found` });
      } catch (error) {
        return reply.status(500).send({ error: 'Unable to load data file' });
      }
    },
  });
};
