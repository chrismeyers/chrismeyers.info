import "dart:mirrors";
import 'package:api/src/schema_field.dart';

class SchemaMaker {
  static List<Map<String, dynamic>> build(Type type) {
    final List<Map<String, dynamic>> schema = [];

    reflectClass(type).declarations.forEach((symbol, decl) {
      decl.metadata.forEach((inst) {
        if (inst.reflectee.runtimeType == SchemaField) {
          final Map<String, dynamic> item = {
            "field": MirrorSystem.getName(symbol),
            "tag": inst.getField(#tag).reflectee
          };

          // Setting a field to null will prevent adding the field.
          if (inst.getField(#type).reflectee != null) {
            item["type"] = inst.getField(#type).reflectee;
          }
          if (inst.getField(#multiple).reflectee != null) {
            item["multiple"] = inst.getField(#multiple).reflectee;
          }
          if (inst.getField(#required).reflectee != null) {
            item["required"] = inst.getField(#required).reflectee;
          }
          if (inst.getField(#options).reflectee != null) {
            item["options"] = inst.getField(#options).reflectee;
          }

          schema.add(item);
        }
      });
    });

    return schema;
  }
}
