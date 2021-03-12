const fs = require('fs');
const path = require('path');

module.exports = async (app) => {
  app.get('/projects', async () => {
    const { projects } = JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', 'data', 'data.json')),
    );

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
        fs.readFileSync(path.join(__dirname, '..', 'data', 'data.json')),
      );

      const project = projects.find((p) => p.id === id);

      if (project) return project;

      return reply.code(404).send({ message: `Project \`${id}\` not found` });
    },
  });
};
