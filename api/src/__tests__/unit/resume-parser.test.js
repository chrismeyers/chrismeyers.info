const path = require('path');
const createResumeParser = require('../../lib/resume-parser');

describe('Resume Parser', () => {
  let parser;

  beforeEach(async () => {
    parser = createResumeParser(
      path.join(__dirname, 'data', 'test_resume.tex'),
    );
    await parser.load();
  });

  describe('full', () => {
    it('parses experience section', async () => {
      const items = parser.parseComplexSection('Experience');

      expect(items).toHaveLength(2);

      expect(items[0].url).toBe('https://www.company1.com');
      expect(items[0].firstLine).toHaveLength(2);
      expect(items[0].firstLine[0]).toBe('Company 1');
      expect(items[0].firstLine[1]).toBe('Planet Earth');

      expect(items[0].secondLine).toHaveLength(2);
      expect(items[0].secondLine[0][0]).toBe('Position 1');
      expect(items[0].secondLine[0][1]).toBe('June 1234 &ndash; Present');
      expect(items[0].secondLine[1][0]).toBe('Position 2');
      expect(items[0].secondLine[1][1]).toBe('Jan. 1234 &ndash; May 1234');

      expect(items[0].info).toHaveLength(2);
      expect(items[0].info[0]).toEqual(['Item 1', 'Item 2']);
      expect(items[0].info[1]).toEqual(['Item 1']);

      expect(items[1].url).toBe('https://company2.com');
      expect(items[1].firstLine).toHaveLength(2);
      expect(items[1].firstLine[0]).toBe('Company 2');
      expect(items[1].firstLine[1]).toBe('Mars');

      expect(items[1].secondLine).toHaveLength(1);
      expect(items[1].secondLine[0][0]).toBe('Position 1');
      expect(items[1].secondLine[0][1]).toBe('Jan. 2199 &ndash; Mar. 2208');

      expect(items[1].info).toHaveLength(1);
      expect(items[1].info[0]).toEqual(['Item 1', 'Item 2', 'Item 3']);
    });

    it('parses education section', async () => {
      const items = parser.parseComplexSection('Education');

      expect(items).toHaveLength(1);

      expect(items[0].url).toBe('https://www.school.edu');

      expect(items[0].firstLine).toHaveLength(2);
      expect(items[0].firstLine[0]).toBe('Degree');
      expect(items[0].firstLine[1]).toBe('Planet Earth');

      expect(items[0].secondLine).toHaveLength(1);
      expect(items[0].secondLine[0][0]).toBe('School');
      expect(items[0].secondLine[0][1]).toBe('Jan. 9999 &ndash; Dec. 9999');

      expect(items[0].info).toHaveLength(1);
      expect(items[0].info[0]).toEqual([]);
    });

    it('parses technical skills section', async () => {
      const items = parser.parseListSection('TechnicalSkills');

      expect(items).toHaveLength(4);

      expect(items[0].mainItem).toBe('Lanuguage list 100%:');
      expect(items[0].subItems).toHaveLength(1);
      expect(items[0].subItems[0]).toBe(
        'Language 1 (Something 1, Something 2), Language 2, Language 3',
      );

      expect(items[1].mainItem).toBe('Item 1');
      expect(items[2].mainItem).toBe('Item 2');
      expect(items[3].mainItem).toBe('Item 3');
    });
  });

  describe('summary', () => {
    it('parses language summary', async () => {
      const items = parser.getLanguages();

      expect(items.web).toEqual([
        'Language 1 (Something 1, Something 2)',
        'Language 2',
        'Language 3',
      ]);
    });

    it('parses most recent job', async () => {
      const items = parser.getMostRecentJob();

      expect(items.employed).toBe(true);
      expect(items.company).toBe('Company 1');
      expect(items.url).toBe('https://www.company1.com');
      expect(items.title).toBe('Position 1');
      expect(items.dates).toHaveLength(2);
      expect(items.dates).toEqual(['June 1234', 'Present']);
    });
  });
});
