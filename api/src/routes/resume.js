const S = require('fluent-json-schema');

module.exports = async (app) => {
  app.get('/resume', {
    schema: {
      response: {
        200: S.ref('schema#resumeResponse'),
      },
    },
    handler: async (request, reply) => {
      try {
        const parser = await request.diScope.resolve('resumeParser');

        return {
          experience: parser.parseComplexSection('Experience'),
          education: parser.parseComplexSection('Education'),
          skills: parser.parseListSection('TechnicalSkills'),
        };
      } catch (error) {
        return reply.internalServerError('Unable to load resume file');
      }
    },
  });

  app.get('/resume/summary', {
    schema: {
      response: {
        200: S.ref('schema#resumeSummaryResponse'),
      },
    },
    handler: async (request, reply) => {
      try {
        const parser = await request.diScope.resolve('resumeParser');

        return {
          languages: parser.getLanguages(),
          mostRecentJob: parser.getMostRecentJob(),
        };
      } catch (error) {
        return reply.internalServerError('Unable to load resume file');
      }
    },
  });
};
