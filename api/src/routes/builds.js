const fs = require('fs').promises;
const path = require('path');

module.exports = async (app) => {
  app.get('/builds', async () => {
    const { builds } = JSON.parse(
      await fs.readFile(path.join(__dirname, '..', 'data', 'data.json')),
    );

    return { items: builds };
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
      const { builds } = JSON.parse(
        await fs.readFile(path.join(__dirname, '..', 'data', 'data.json')),
      );

      const build = builds.find((p) => p.id === id);

      if (build) return build;

      return reply.code(404).send({ message: `Build \`${id}\` not found` });
    },
  });
};
