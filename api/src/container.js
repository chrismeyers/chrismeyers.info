const { asFunction, Lifetime } = require('awilix');
const dataLoader = require('./lib/data-loader');
const createProjectService = require('./lib/project-service');
const createBuildService = require('./lib/build-service');

module.exports = {
  projectService: asFunction(() => createProjectService(dataLoader), {
    lifetime: Lifetime.SCOPED,
  }),
  buildService: asFunction(() => createBuildService(dataLoader), {
    lifetime: Lifetime.SCOPED,
  }),
};
