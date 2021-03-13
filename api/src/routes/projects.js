const fs = require('fs').promises;
const path = require('path');

module.exports = async (app) => {
  app.get('/projects', async () => {
    let { projects } = JSON.parse(
      await fs.readFile(path.join(__dirname, '..', 'data', 'data.json')),
    );

    projects = projects.filter((p) => p.active);

    return { items: projects };
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
      const { projects } = JSON.parse(
        await fs.readFile(path.join(__dirname, '..', 'data', 'data.json')),
      );

      const project = projects.find((p) => p.id === id && p.active);

      if (project) return project;

      return reply.code(404).send({ message: `Project \`${id}\` not found` });
    },
  });
};
