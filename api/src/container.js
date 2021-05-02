const path = require('path');
const { asFunction } = require('awilix');
const dataLoader = require('./lib/data-loader');
const createProjectRepository = require('./lib/project-repository');
const createBuildRepository = require('./lib/build-repository');
const createResumeParser = require('./lib/resume-parser');

module.exports = {
  projectRepository: asFunction(() => createProjectRepository(dataLoader)),
  buildRepository: asFunction(() => createBuildRepository(dataLoader)),
  resumeParser: asFunction(async () =>
    createResumeParser(
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
  ),
};
