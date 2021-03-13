const fs = require('fs').promises;

const createResumeParser = (path) => {
  const rawSections = {};

  const load = async () => {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.split('\n');

    const beginPattern = String.raw`% BEGIN`;
    const endPattern = String.raw`% END`;
    let section = '';

    lines.forEach((line) => {
      const trimmedLine = line.trim();

      if (trimmedLine === '') {
        return;
      }

      if (trimmedLine.includes(beginPattern)) {
        // New section
        section = trimmedLine.substring(beginPattern.length + 1);
      } else if (section !== '' && !trimmedLine.includes(endPattern)) {
        // Between begin and end
        if (section in rawSections) {
          const values = rawSections[section];
          values.push(trimmedLine);
          rawSections[section] = values;
        } else {
          rawSections[section] = [trimmedLine];
        }
      } else {
        // Between end and begin
        section = '';
      }
    });
  };

  const cleanString = (input, removeInlineComments) => {
    let output = input.trim();

    if (removeInlineComments) {
      // This regex skips escaped percent signs by using negative lookbehind
      output = output.split(new RegExp(String.raw`(?<!\\)%`))[0].trim();
    }

    output = output.replaceAll('\\CPP', 'C++');
    output = output.replaceAll('\\break', '');
    output = output.replaceAll('--', '&ndash;');
    output = output.replaceAll('\\', '');

    return output;
  };

  const parseComplexSection = (section, removeInlineComments = true) => {
    const urlPattern = String.raw`% URL`;
    const firstLinePattern = String.raw`{\textbf{`;
    const secondLinePattern = String.raw`{\emph{`;
    const endPattern = String.raw`}}`;
    const infoPattern = String.raw`\item`;
    const circleInfoPattern = String.raw`\item[$\circ$]`;
    const sameCompanyPattern = String.raw`% Same Company`;

    const items = [];

    let url = null;
    let firstLine = [];
    let secondLine = [];
    let info = [];

    let currentSecondLine = [];
    let currentInfo = [];

    rawSections[section].forEach((line, i) => {
      const trimmedLine = line.trim();

      if (trimmedLine.startsWith(urlPattern)) {
        const beginPatternIndex =
          trimmedLine.indexOf(urlPattern) + urlPattern.length + 1;

        url = trimmedLine.substring(beginPatternIndex);
      } else if (trimmedLine.startsWith(firstLinePattern)) {
        const beginPatternIndex =
          trimmedLine.indexOf(firstLinePattern) + firstLinePattern.length;
        const endPatternIndex = trimmedLine.indexOf(endPattern);
        const cleaned = cleanString(
          trimmedLine
            .substring(beginPatternIndex, endPatternIndex)
            .replaceAll(endPattern, ''),
          removeInlineComments,
        );

        firstLine.push(cleaned);
      } else if (trimmedLine.startsWith(secondLinePattern)) {
        const beginPatternIndex =
          trimmedLine.indexOf(secondLinePattern) + secondLinePattern.length;
        const endPatternIndex = trimmedLine.indexOf(endPattern);
        const cleaned = cleanString(
          trimmedLine
            .substring(beginPatternIndex, endPatternIndex)
            .replaceAll(endPattern, ''),
          removeInlineComments,
        );

        currentSecondLine.push(cleaned);
      } else if (trimmedLine.startsWith(sameCompanyPattern)) {
        secondLine.push(currentSecondLine);
        info.push(currentInfo);

        currentSecondLine = [];
        currentInfo = [];
      } else if (trimmedLine.startsWith(infoPattern)) {
        if (i === 0) {
          return;
        }

        if (trimmedLine.length === infoPattern.length) {
          // Beginning of new entry (blank infoPattern line)
          secondLine.push(currentSecondLine);
          info.push(currentInfo);
          items.push({ url, firstLine, secondLine, info });

          url = null;
          firstLine = [];
          secondLine = [];
          info = [];
          currentSecondLine = [];
          currentInfo = [];
        } else {
          const cleaned = cleanString(
            trimmedLine.substring(circleInfoPattern.length + 1),
            removeInlineComments,
          );

          currentInfo.push(cleaned);
        }
      }
    });

    // The loop exits before the last item can be added, add it here
    secondLine.push(currentSecondLine);
    info.push(currentInfo);
    items.push({ url, firstLine, secondLine, info });

    return items;
  };

  const parseListSection = (section, removeInlineComments = true) => {
    const itemPattern = String.raw`\item`;
    const circleItemPattern = String.raw`\item[$\circ$]`;
    const beginSubPattern = String.raw`\begin{itemize*}`;
    const endSubPattern = String.raw`\end{itemize*}`;

    const items = [];
    let subItem = false;
    let count = 0;

    rawSections[section].forEach((line) => {
      if (line.startsWith(beginSubPattern)) {
        subItem = true;
      } else if (line.startsWith(endSubPattern)) {
        subItem = false;
      } else if (line.startsWith(itemPattern)) {
        let cleaned = '';

        if (subItem) {
          cleaned = cleanString(
            line.substring(circleItemPattern.length + 1),
            removeInlineComments,
          );
          items[count - 1].subItems.push(cleaned);
        } else {
          cleaned = cleanString(
            line.substring(itemPattern.length + 1),
            removeInlineComments,
          );
          items.push({ mainItem: cleaned, subItems: [] });
          count += 1;
        }
      }
    });

    return items;
  };

  const getLanguages = () => {
    const languagesPattern = String.raw`% LANGUAGES`;
    // Splits the language lists on commas, except within parentheses
    const regexp = new RegExp(String.raw`(?!\(.*),(?![^(]*?\))`);
    const langMap = {};
    const skills = parseListSection('TechnicalSkills', false);

    skills.forEach((skill) => {
      if (skill.mainItem.includes(languagesPattern)) {
        const type = skill.mainItem.split(languagesPattern)[1].trim();
        langMap[type] = skill.subItems[0].split(regexp).map((s) => s.trim());
      }
    });

    return langMap;
  };

  const getMostRecentJob = () => {
    const job = parseComplexSection('Experience')[0];

    const dates = job.secondLine[0][1].split('&ndash;').map((d) => d.trim());

    return {
      employed: dates[1].toLowerCase() === 'present',
      company: job.firstLine[0],
      url: job.url,
      title: job.secondLine[0][0].split(',')[0],
      dates,
    };
  };

  return {
    load,
    parseComplexSection,
    parseListSection,
    getLanguages,
    getMostRecentJob,
  };
};

module.exports = createResumeParser;