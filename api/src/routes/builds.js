const fs = require('fs').promises;
const path = require('path');

module.exports = async (app) => {
  app.get('/builds', async () => {
    let { builds } = JSON.parse(
      await fs.readFile(path.join(__dirname, '..', 'data', 'data.json')),
    );

    builds = builds.filter((b) => b.active);

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

      const build = builds.find((b) => b.id === id && b.active);

      if (build) return build;

      return reply.code(404).send({ message: `Build \`${id}\` not found` });
    },
  });
};
