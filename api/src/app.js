const fastify = require('fastify');
const fastifyCors = require('fastify-cors');
const fastifyHelmet = require('fastify-helmet');
const projectRoutes = require('./routes/projects');
const buildRoutes = require('./routes/builds');
const resumeRoutes = require('./routes/resume');

module.exports = (opts = {}) => {
  const app = fastify(opts);

  // Plugins
  app.register(fastifyCors, {
    origin: process.env.CORS_ALLOWED_ORIGINS.split(','),
  });
  app.register(fastifyHelmet);

  // Routes
  app.register(projectRoutes);
  app.register(buildRoutes);
  app.register(resumeRoutes);

  return app;
};
