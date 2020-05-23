import "package:api/api.dart";
import "package:api/src/schema_field.dart";
import "build.dart";
import "project.dart";

class Image extends ManagedObject<_Image> implements _Image {
  static Type get interface => _Image;
}

class _Image {
  @Column(primaryKey: true, autoincrement: true)
  int id;

  @SchemaField()
  String path;

  @SchemaField()
  String title;

  @SchemaField(type: "number")
  int pos;

  @SchemaField(tag: "select", type: null, multiple: false, options: ["square", "port", "land"])
  String orient;

  @Relate(#image)
  Build build;

  @Relate(#images)
  Project project;
}
