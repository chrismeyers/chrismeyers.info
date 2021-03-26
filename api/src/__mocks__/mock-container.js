const path = require('path');
const { asFunction, asValue } = require('awilix');
const mockDataLoader = require('./mock-data-loader');
const createProjectRepository = require('../lib/project-repository');
const createBuildRepository = require('../lib/build-repository');

module.exports = {
  projectRepository: asFunction(() => createProjectRepository(mockDataLoader)),
  buildRepository: asFunction(() => createBuildRepository(mockDataLoader)),
  resumePath: asValue(
    path.join(__dirname, 'data', 'resume', 'test_resume.tex'),
  ),
};
