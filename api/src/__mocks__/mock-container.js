const { asFunction, Lifetime } = require('awilix');
const mockDataLoader = require('./mock-data-loader');
const createProjectService = require('../lib/project-service');
const createBuildService = require('../lib/build-service');

module.exports = {
  projectService: asFunction(() => createProjectService(mockDataLoader), {
    lifetime: Lifetime.SCOPED,
  }),
  buildService: asFunction(() => createBuildService(mockDataLoader), {
    lifetime: Lifetime.SCOPED,
  }),
};
