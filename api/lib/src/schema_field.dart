class SchemaField {
  const SchemaField(
      {String tag = 'input',
      String type = 'text',
      bool required = true,
      bool multiple,
      List<String> options})
      : tag = tag,
        type = type,
        multiple = multiple,
        required = required,
        options = options;

  final String tag;
  final String type;
  final bool multiple;
  final bool required;
  final List<String> options;
}
