const path = require('path');
const createResumeParser = require('../lib/resume-parser');

module.exports = async (app) => {
  app.get('/resume', async () => {
    const parser = createResumeParser(
      path.join(
        __dirname,
        '..',
        '..',
        '..',
        'resume',
        'LaTeX',
        'Meyers_Chris',
        'Meyers_Chris_Resume.tex',
      ),
    );

    await parser.load();

    return {
      experience: parser.parseComplexSection('Experience'),
      education: parser.parseComplexSection('Education'),
      skills: parser.parseListSection('TechnicalSkills'),
    };
  });

  app.get('/resume/summary', async () => {
    const parser = createResumeParser(
      path.join(
        __dirname,
        '..',
        '..',
        '..',
        'resume',
        'LaTeX',
        'Meyers_Chris',
        'Meyers_Chris_Resume.tex',
      ),
    );

    await parser.load();

    return {
      languages: parser.getLanguages(),
      mostRecentJob: parser.getMostRecentJob(),
    };
  });
};
