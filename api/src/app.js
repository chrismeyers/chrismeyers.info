const fastify = require('fastify');
const fastifyCors = require('fastify-cors');
const fastifyHelmet = require('fastify-helmet');
const fastifyEnv = require('fastify-env');
const S = require('fluent-json-schema');
const projectRoutes = require('./routes/projects');
const buildRoutes = require('./routes/builds');
const resumeRoutes = require('./routes/resume');

module.exports = async (opts = {}) => {
  const app = fastify(opts);

  // Plugins
  await app.register(fastifyEnv, {
    dotenv: true,
    schema: S.object()
      .prop('NODE_ENV', S.string().required())
      .prop(
        'CORS_ALLOWED_ORIGINS',
        S.raw({ type: 'string', separator: ',' }).required(),
      )
      .prop('PORT', S.string())
      .prop('ADDR', S.string())
      .valueOf(),
  });
  app.register(fastifyCors, {
    origin: app.config.CORS_ALLOWED_ORIGINS,
  });
  app.register(fastifyHelmet);

  // Routes
  app.register(projectRoutes);
  app.register(buildRoutes);
  app.register(resumeRoutes);

  return app;
};
