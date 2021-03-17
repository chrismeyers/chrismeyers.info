const path = require('path');
const { asFunction, asValue } = require('awilix');
const dataLoader = require('./lib/data-loader');
const createProjectService = require('./lib/project-service');
const createBuildService = require('./lib/build-service');

module.exports = {
  projectService: asFunction(() => createProjectService(dataLoader)),
  buildService: asFunction(() => createBuildService(dataLoader)),
  resumePath: asValue(
    path.join(
      __dirname,
      '..',
      '..',
      'resume',
      'LaTeX',
      'Meyers_Chris',
      'Meyers_Chris_Resume.tex',
    ),
  ),
};
