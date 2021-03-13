const fastify = require('fastify');
const fastifyCors = require('fastify-cors');
const projectRoutes = require('./routes/projects');
const buildRoutes = require('./routes/builds');
const resumeRoutes = require('./routes/resume');

module.exports = (opts = {}) => {
  const app = fastify(opts);

  // Plugins
  app.register(fastifyCors, {
    origin: process.env.CORS_ALLOWED_ORIGINS.split(','),
  });

  // Routes
  app.register(projectRoutes);
  app.register(buildRoutes);
  app.register(resumeRoutes);

  return app;
};
