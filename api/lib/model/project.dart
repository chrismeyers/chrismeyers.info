import "package:api/api.dart";
import "package:api/src/schema_field.dart";
import "image.dart";

class Project extends ManagedObject<_Project> implements _Project {
  static Type get interface => _Project;
}

class _Project {
  @Column(primaryKey: true, autoincrement: true)
  int id;

  // Controls if the entry should be displayed on the front-end.
  @SchemaField(type: "checkbox", multiple: null, required: false)
  bool active;

  @SchemaField(multiple: null)
  String title;

  @Column(nullable: true)
  @SchemaField(type: "url", multiple: null, required: false)
  String webUrl;

  @SchemaField(type: "url", multiple: null)
  String codeUrl;

  @SchemaField(multiple: null)
  String displayDate;

  @SchemaField(type: "date", multiple: null)
  DateTime startedDate;

  @SchemaField(multiple: null)
  String lang;

  @SchemaField(tag: "textarea", multiple: null)
  String info;

  @SchemaField(multiple: null)
  String role;

  @SchemaField(multiple: null)
  String stat;

  @SchemaField(type: null, tag: "select", multiple: true, required: false)
  ManagedSet<Image> images;
}
