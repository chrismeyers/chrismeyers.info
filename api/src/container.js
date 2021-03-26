const path = require('path');
const { asFunction, asValue } = require('awilix');
const dataLoader = require('./lib/data-loader');
const createProjectRepository = require('./lib/project-repository');
const createBuildRepository = require('./lib/build-repository');

module.exports = {
  projectRepository: asFunction(() => createProjectRepository(dataLoader)),
  buildRepository: asFunction(() => createBuildRepository(dataLoader)),
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
