const path = require('path');
const { asFunction } = require('awilix');
const mockDataLoader = require('./mock-data-loader');
const createProjectRepository = require('../lib/project-repository');
const createBuildRepository = require('../lib/build-repository');
const createResumeParser = require('../lib/resume-parser');

module.exports = {
  projectRepository: asFunction(() => createProjectRepository(mockDataLoader)),
  buildRepository: asFunction(() => createBuildRepository(mockDataLoader)),
  resumeParser: asFunction(async () =>
    createResumeParser(
      path.join(__dirname, 'data', 'resume', 'test_resume.tex'),
    ),
  ),
};
