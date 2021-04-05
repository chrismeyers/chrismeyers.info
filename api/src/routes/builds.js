const S = require('fluent-json-schema');

const buildResponseSchema = S.object()
  .prop('id', S.number())
  .prop('active', S.boolean())
  .prop('displayDate', S.string())
  .prop('startedDate', S.string().format(S.FORMATS.DATE_TIME))
  .prop('cpu', S.string())
  .prop('cool', S.anyOf([S.string(), S.null()]))
  .prop('mobo', S.string())
  .prop('ram', S.string())
  .prop('hdd', S.string())
  .prop('ssd', S.anyOf([S.string(), S.null()]))
  .prop('gpu', S.string())
  .prop(
    'image',
    S.object()
      .prop('id', S.number())
      .prop('path', S.string())
      .prop('thumbnail', S.anyOf([S.string(), S.null()]))
      .prop('title', S.string())
      .prop('pos', S.number())
      .prop('orient', S.string()),
  );

module.exports = async (app) => {
  app.get('/builds', {
    schema: {
      response: {
        200: S.object().prop('items', S.array().items(buildResponseSchema)),
      },
    },
    handler: async (request, reply) => {
      try {
        const repo = request.diScope.resolve('buildRepository');
        return { items: await repo.active() };
      } catch (error) {
        return reply.internalServerError('Unable to load data');
      }
    },
  });

  app.get('/builds/:id', {
    schema: {
      params: S.object().prop('id', S.number().required()),
      response: {
        200: buildResponseSchema,
      },
    },
    handler: async (request, reply) => {
      const { id } = request.params;

      try {
        const repo = request.diScope.resolve('buildRepository');
        const build = await repo.findById(id);

        if (build) return build;

        return reply.notFound(`Build ${id} not found`);
      } catch (error) {
        return reply.internalServerError('Unable to load data');
      }
    },
  });
};
