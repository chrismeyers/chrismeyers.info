class SchemaField {
  const SchemaField({String tag = "input", String type = "text", bool multiple = false, bool required = true})
      : tag = tag,
        type = type,
        multiple = multiple,
        required = required;

  final String tag;
  final String type;
  final bool multiple;
  final bool required;
}
