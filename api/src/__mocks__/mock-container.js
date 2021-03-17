const path = require('path');
const { asFunction, asValue } = require('awilix');
const mockDataLoader = require('./mock-data-loader');
const createProjectService = require('../lib/project-service');
const createBuildService = require('../lib/build-service');

module.exports = {
  projectService: asFunction(() => createProjectService(mockDataLoader)),
  buildService: asFunction(() => createBuildService(mockDataLoader)),
  resumePath: asValue(
    path.join(__dirname, 'data', 'resume', 'test_resume.tex'),
  ),
};
