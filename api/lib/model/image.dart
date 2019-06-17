import "package:api/api.dart";
import "package:api/src/schema_field.dart";
import "build.dart";
import "project.dart";

class Image extends ManagedObject<_Image> implements _Image {
  Type get interface => _Image;
}

class _Image {
  @Column(primaryKey: true, autoincrement: true)
  int id;

  @SchemaField(multiple: null)
  String path;

  @SchemaField(multiple: null)
  String title;

  @SchemaField(type: "number", multiple: null)
  int pos;

  @SchemaField(multiple: null)
  String orient;

  @Relate(#image)
  Build build;

  @Relate(#images)
  Project project;
}
