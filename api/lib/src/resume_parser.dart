import "dart:io";

class ListItem {
  ListItem(this._mainItem) : _subItems = [];

  final String _mainItem;
  final List<String> _subItems;

  void add(String subItem) {
    _subItems.add(subItem);
  }

  String get mainItem => _mainItem;
  List<String> get subItems => _subItems;

  Map<String, dynamic> toJson() => {"mainItem": _mainItem, "subItems": _subItems};
}

class ResumeParser {
  ResumeParser(String path)
      : _lines = File(path).readAsLinesSync(),
        _rawSections = {},
        _lastModified = File(path).lastModifiedSync() {
    loadLatexFile();
  }

  final List<String> _lines;
  final Map<String, List<String>> _rawSections;
  final DateTime _lastModified;

  DateTime get lastModified => _lastModified;

  void loadLatexFile() {
    const String beginPattern = "% BEGIN";
    const String endPattern = "% END";
    const String commentPattern = "\\begin{comment}";
    String section = "";

    for (String line in _lines) {
      line = line.trim();
      if (line == "" || line.contains(commentPattern)) {
        continue;
      } else if (line.contains(beginPattern)) {
        // New section
        section = line.substring(beginPattern.length + 1);
      } else if (section.isNotEmpty && !line.contains(endPattern)) {
        // Between begin and end
        if (_rawSections.containsKey(section)) {
          _rawSections[section].add(line);
        } else {
          _rawSections[section] = [line];
        }
      } else {
        // Between end and begin
        section = "";
        continue;
      }
    }
  }

  List<Map<String, dynamic>> parseComplexSection(String section, {bool removeInlineComments = true}) {
    const String urlPattern = "% URL";
    const String firstLinePattern = "{\\textbf{";
    const String secondLinePattern = "{\\emph{";
    const String endPattern = "}}";
    const String infoPattern = "\\item";
    const String sameCompanyPattern = "% Same Company";

    final List<Map<String, dynamic>> items = [];

    String url;
    List<String> firstLine = [];
    List<List<String>> secondLine = [];
    List<List<String>> info = [];

    List<String> currentSecondLine = [];
    List<String> currentInfo = [];

    for (int i = 0; i < _rawSections[section].length; i++) {
      final String line = _rawSections[section][i].trim();

      if (line.startsWith(urlPattern)) {
        final int beginPatternIndex = line.indexOf(urlPattern) + urlPattern.length + 1;

        url = line.substring(beginPatternIndex);
      } else if (line.startsWith(firstLinePattern)) {
        final int beginPatternIndex = line.indexOf(firstLinePattern) + firstLinePattern.length;
        final int endPatternIndex = line.indexOf(endPattern);
        final String cleaned = _cleanString(
            line.substring(beginPatternIndex, endPatternIndex).replaceAll(endPattern, ""), removeInlineComments);

        firstLine.add(cleaned);
      } else if (line.startsWith(secondLinePattern)) {
        final int beginPatternIndex = line.indexOf(secondLinePattern) + secondLinePattern.length;
        final int endPatternIndex = line.indexOf(endPattern);
        final String cleaned = _cleanString(
            line.substring(beginPatternIndex, endPatternIndex).replaceAll(endPattern, ""), removeInlineComments);

        currentSecondLine.add(cleaned);
      } else if (line.startsWith(sameCompanyPattern)) {
        secondLine.add(List<String>.from(currentSecondLine));
        info.add(List<String>.from(currentInfo));

        currentSecondLine = [];
        currentInfo = [];
      } else if (line.startsWith(infoPattern)) {
        if (i == 0) {
          continue;
        } else if (line.length == infoPattern.length) {
          // Beginning of new entry (blank $infoPattern line)
          secondLine.add(List<String>.from(currentSecondLine));
          info.add(List<String>.from(currentInfo));

          items.add({
            "url": url,
            "firstLine": List<String>.from(firstLine),
            "secondLine": List<List<String>>.from(secondLine),
            "info": List<List<String>>.from(info)
          });

          url = null;
          firstLine = [];
          secondLine = [];
          info = [];
          currentSecondLine = [];
          currentInfo = [];
        } else {
          final String cleaned = _cleanString(line.substring(infoPattern.length + 1), removeInlineComments);
          currentInfo.add(cleaned);
        }
      }
    }

    // The loop exits before the last item can be added. Add it here.
    secondLine.add(List<String>.from(currentSecondLine));
    info.add(List<String>.from(currentInfo));
    items.add({
      "url": url,
      "firstLine": List<String>.from(firstLine),
      "secondLine": List<List<String>>.from(secondLine),
      "info": List<List<String>>.from(info)
    });

    return items;
  }

  List<ListItem> parseListSection(String section, {bool removeInlineComments = true}) {
    const String itemPattern = "\\item";
    const String beginSubPattern = "\\begin{itemize*}";
    const String endSubPattern = "\\end{itemize*}";

    final List<ListItem> items = [];
    bool subItem = false;
    int count = 0;

    for (String line in _rawSections[section]) {
      if (line.startsWith(beginSubPattern)) {
        subItem = true;
      } else if (line.startsWith(endSubPattern)) {
        subItem = false;
      } else if (line.startsWith(itemPattern)) {
        final String cleaned = _cleanString(line.substring(itemPattern.length + 1), removeInlineComments);
        if (subItem) {
          items[count - 1].add(cleaned);
        } else {
          items.add(ListItem(cleaned));
          count++;
        }
      }
    }

    return items;
  }

  Map<String, String> getLanguages() {
    const String languagesPattern = "% LANGUAGES";
    final Map<String, String> langMap = {};
    final List<ListItem> skills = parseListSection("TechnicalSkills", removeInlineComments: false);

    for (final skill in skills) {
      if (skill.mainItem.contains(languagesPattern)) {
        final String type = skill.mainItem.split(languagesPattern)[1].trim();
        langMap[type] = skill.subItems[0];
      }
    }

    return langMap;
  }

  Map<String, dynamic> getMostRecentJob() {
    final Map<String, dynamic> job = parseComplexSection("Experience")[0];

    final List<String> dates = (job["secondLine"][0][1] as String).split("&ndash;").map((d) => d.trim()).toList();

    return {
      "employed": dates[1].toLowerCase() == "present",
      "company": job["firstLine"][0],
      "url": job["url"],
      "title": job["secondLine"][0][0].split(",")[0],
      "dates": dates
    };
  }

  String _cleanString(String input, bool removeInlineComments) {
    String output = input.trim();

    output = output.replaceAll("\\CPP", "C++");
    output = output.replaceAll("\\break", "");
    output = output.replaceAll("--", "&ndash;");
    output = output.replaceAll("\\", "");

    if (removeInlineComments) {
      // TODO: handle non-comment percent signs
      output = output.split("%")[0].trim();
    }

    return output;
  }
}
