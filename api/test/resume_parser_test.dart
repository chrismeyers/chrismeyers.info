import 'package:api/src/resume_parser.dart';
import 'package:test/test.dart';

void main() {
  ResumeParser parser;

  setUp(() async {
    parser = ResumeParser('../resume/LaTeX/test/test_resume.tex');
  });

  group('Section parsing', () {
    test('ResumeParser parses experience section', () {
      final List<Map<String, dynamic>> items =
          parser.parseComplexSection('Experience');

      expect(items.length, equals(2));

      expect(items[0]['url'], equals('https://www.company1.com'));
      expect(items[0]['firstLine'].length, equals(2));
      expect(items[0]['firstLine'][0], equals('Company 1'));
      expect(items[0]['firstLine'][1], equals('Planet Earth'));

      expect(items[0]['secondLine'].length, equals(2));
      expect(items[0]['secondLine'][0][0], equals('Position 1'));
      expect(items[0]['secondLine'][0][1], equals('June 1234 &ndash; Present'));
      expect(items[0]['secondLine'][1][0], equals('Position 2'));
      expect(
          items[0]['secondLine'][1][1], equals('Jan. 1234 &ndash; May 1234'));

      expect(items[0]['info'].length, equals(2));
      expect(items[0]['info'][0], equals(['Item 1', 'Item 2']));
      expect(items[0]['info'][1], equals(['Item 1']));

      expect(items[1]['url'], equals('https://company2.com'));
      expect(items[1]['firstLine'].length, equals(2));
      expect(items[1]['firstLine'][0], equals('Company 2'));
      expect(items[1]['firstLine'][1], equals('Mars'));

      expect(items[1]['secondLine'].length, equals(1));
      expect(items[1]['secondLine'][0][0], equals('Position 1'));
      expect(
          items[1]['secondLine'][0][1], equals('Jan. 2199 &ndash; Mar. 2208'));

      expect(items[1]['info'].length, equals(1));
      expect(items[1]['info'][0], equals(['Item 1', 'Item 2', 'Item 3']));
    });

    test('ResumeParser parses education section', () {
      final List<Map<String, dynamic>> items =
          parser.parseComplexSection('Education');

      expect(items.length, equals(1));

      expect(items[0]['url'], equals('https://www.school.edu'));

      expect(items[0]['firstLine'].length, equals(2));
      expect(items[0]['firstLine'][0], equals('Degree'));
      expect(items[0]['firstLine'][1], equals('Planet Earth'));

      expect(items[0]['secondLine'].length, equals(1));
      expect(items[0]['secondLine'][0][0], equals('School'));
      expect(
          items[0]['secondLine'][0][1], equals('Jan. 9999 &ndash; Dec. 9999'));

      expect(items[0]['info'].length, equals(1));
      expect(items[0]['info'][0], equals([]));
    });

    test('ResumeParser parses technical skills section', () {
      final List<ListItem> items = parser.parseListSection('TechnicalSkills');

      expect(items.length, equals(4));

      expect(items[0].mainItem, equals('Lanuguage list 100%:'));
      expect(items[0].subItems.length, equals(1));
      expect(
          items[0].subItems[0],
          equals(
              'Language 1 (Something 1, Something 2), Language 2, Language 3'));

      expect(items[1].mainItem, equals('Item 1'));
      expect(items[2].mainItem, equals('Item 2'));
      expect(items[3].mainItem, equals('Item 3'));
    });
  });

  group('Summary parsing', () {
    test('ResumeParser parses language summary', () {
      final Map<String, List<String>> items = parser.getLanguages();

      expect(items.length, equals(1));

      expect(
          items['web'],
          equals([
            'Language 1 (Something 1, Something 2)',
            'Language 2',
            'Language 3'
          ]));
    });

    test('ResumeParser parses most recent job', () {
      final Map<String, dynamic> items = parser.getMostRecentJob();

      expect(items.length, equals(5));

      expect(items['employed'], equals(true));
      expect(items['company'], equals('Company 1'));
      expect(items['url'], equals('https://www.company1.com'));
      expect(items['title'], equals('Position 1'));
      expect(items['dates'].length, equals(2));
      expect(items['dates'], equals(['June 1234', 'Present']));
    });
  });
}
