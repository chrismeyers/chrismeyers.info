import "dart:io";

class ListItem {
  ListItem(this._mainItem) :
    _subItems = [];

  final String _mainItem;
  final List<String> _subItems;

  void add(String subItem) {
    _subItems.add(subItem);
  }

  Map<String, dynamic> toJson() => {
    "mainItem": _mainItem,
    "subItems": _subItems
  };
}

class ResumeParser {
  ResumeParser(String path) :
    _lines = File(path).readAsLinesSync(),
    _rawSections = {},
    _lastModified = File(path).lastModifiedSync();

  final List<String> _lines;
  final Map<String, List<String>> _rawSections;
  final DateTime _lastModified;

  DateTime get lastModified => _lastModified;

  void parseLatexFile() {
    const String beginPattern = "% BEGIN ";
    const String endPattern = "% END ";
    String section = "";

    for(String line in _lines) {
      line = line.trim();
      if(line.contains(beginPattern)) { // New section
        section = line.substring(beginPattern.length);
      }
      else if(section.isNotEmpty && !line.contains(endPattern)) { // Between begin and end
        if(_rawSections.containsKey(section)) {
          _rawSections[section].add(line);
        }
        else {
          _rawSections[section] = [line];
        }
      }
      else { // Between end and begin
        section = "";
        continue;
      }
    }
  }

  List<Map<String, dynamic>> parseComplexSection(String section) {
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

    for(int i = 0; i < _rawSections[section].length; i++) {
      final String line = _rawSections[section][i].trim();

      if(line.startsWith(urlPattern)) {
        final int beginPatternIndex = line.indexOf(urlPattern) + urlPattern.length + 1;

        url = line.substring(beginPatternIndex);
      }
      else if(line.startsWith(firstLinePattern)) {
        final int beginPatternIndex = line.indexOf(firstLinePattern) + firstLinePattern.length;
        final int endPatternIndex = line.indexOf(endPattern);
        final String cleaned = _cleanString(line.substring(beginPatternIndex, endPatternIndex).replaceAll(endPattern, ""));

        firstLine.add(cleaned);
      }
      else if(line.startsWith(secondLinePattern)){
        final int beginPatternIndex = line.indexOf(secondLinePattern) + secondLinePattern.length;
        final int endPatternIndex = line.indexOf(endPattern);
        final String cleaned = _cleanString(line.substring(beginPatternIndex, endPatternIndex).replaceAll(endPattern, ""));

        currentSecondLine.add(cleaned);
      }
      else if(line.startsWith(sameCompanyPattern)) {
        secondLine.add(List<String>.from(currentSecondLine));
        info.add(List<String>.from(currentInfo));

        currentSecondLine = [];
        currentInfo = [];
      }
      else if(line.startsWith(infoPattern)) {
        if(i == 0) {
          continue;
        }
        else if(line.length == infoPattern.length) { // Beginning of new entry (blank $infoPattern line)
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
        }
        else {
          final String cleaned = _cleanString(line.substring(infoPattern.length + 1));
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

  List<ListItem> parseListSection(String section) {
    const String itemPattern = "\\item";
    const String beginSubPattern = "\\begin{itemize*}";
    const String endSubPattern = "\\end{itemize*}";

    final List<ListItem> items = [];
    bool subItem = false;
    int count = 0;

    for(String line in _rawSections[section]) {
      if(line.startsWith(beginSubPattern)) {
        subItem = true;
      }
      else if(line.startsWith(endSubPattern)) {
        subItem = false;
      }
      else if(line.startsWith(itemPattern)) {
        final String cleaned = _cleanString(line.substring(itemPattern.length + 1));
        if(subItem) {
          items[count - 1].add(cleaned);
        }
        else {
          items.add(ListItem(cleaned));
          count++;
        }
      }
    }

    return items;
  }

  String _cleanString(String input) {
    String output = input.trim();

    output = output.replaceAll("\\CPP", "C++");
    output = output.replaceAll("\\break", "");
    output = output.replaceAll("--", "&ndash;");
    output = output.replaceAll("\\", "");

    return output;
  }
}
