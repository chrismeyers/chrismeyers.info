const S = require('fluent-json-schema');

const projectResponseSchema = S.object()
  .prop('id', S.number())
  .prop('active', S.boolean())
  .prop('title', S.string())
  .prop('webUrl', S.anyOf([S.string(S.FORMATS.URL), S.null()]))
  .prop('codeUrl', S.string(S.FORMATS.URL))
  .prop('displayDate', S.string())
  .prop('startedDate', S.string().format(S.FORMATS.DATE_TIME))
  .prop('lang', S.string())
  .prop('info', S.string())
  .prop('role', S.string())
  .prop('stat', S.string())
  .prop(
    'images',
    S.array().items(
      S.object()
        .prop('id', S.number())
        .prop('path', S.string())
        .prop('thumbnail', S.anyOf([S.string(), S.null()]))
        .prop('title', S.string())
        .prop('pos', S.number())
        .prop('orient', S.string()),
    ),
  );

module.exports = async (app) => {
  app.get('/projects', {
    schema: {
      response: {
        200: S.object().prop('items', S.array().items(projectResponseSchema)),
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
        200: projectResponseSchema,
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
