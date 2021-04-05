const S = require('fluent-json-schema');
const createResumeParser = require('../lib/resume-parser');

module.exports = async (app) => {
  app.get('/resume', {
    schema: {
      response: {
        200: S.object()
          .definition(
            'complex',
            S.array()
              .id('#complex')
              .items(
                S.object()
                  .prop('url', S.string(S.FORMATS.URL))
                  .prop('firstLine', S.array().items(S.string()))
                  .prop(
                    'secondLine',
                    S.array().items(S.array().items(S.string())),
                  )
                  .prop('info', S.array().items(S.array().items(S.string()))),
              ),
          )
          .definition(
            'list',
            S.array()
              .id('#list')
              .items(
                S.object()
                  .prop('mainItem', S.string())
                  .prop('subItems', S.array().items(S.string())),
              ),
          )
          .prop('experience', S.ref('#complex'))
          .prop('education', S.ref('#complex'))
          .prop('skills', S.ref('#list')),
      },
    },
    handler: async (request, reply) => {
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
    },
  });

  app.get('/resume/summary', {
    schema: {
      response: {
        200: S.object()
          .prop(
            'languages',
            S.object()
              .prop('desktop', S.array().items(S.string()))
              .prop('web', S.array().items(S.string())),
          )
          .prop(
            'mostRecentJob',
            S.object()
              .prop('employed', S.boolean())
              .prop('company', S.string())
              .prop('url', S.string(S.FORMATS.URL))
              .prop('title', S.string())
              .prop('dates', S.array().items(S.string())),
          ),
      },
    },
    handler: async (request, reply) => {
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
    },
  });
};
