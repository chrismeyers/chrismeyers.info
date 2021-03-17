const createResumeParser = require('../lib/resume-parser');

module.exports = async (app) => {
  app.get('/resume', async (request, reply) => {
    const parser = createResumeParser(request.diScope.resolve('resumePath'));

    try {
      await parser.load();
    } catch (error) {
      return reply.internalServerError('Unable to load resume file');
    }

    return {
      experience: parser.parseComplexSection('Experience'),
      education: parser.parseComplexSection('Education'),
      skills: parser.parseListSection('TechnicalSkills'),
    };
  });

  app.get('/resume/summary', async (request, reply) => {
    const parser = createResumeParser(request.diScope.resolve('resumePath'));

    try {
      await parser.load();
    } catch (error) {
      return reply.internalServerError('Unable to load resume file');
    }

    return {
      languages: parser.getLanguages(),
      mostRecentJob: parser.getMostRecentJob(),
    };
  });
};
