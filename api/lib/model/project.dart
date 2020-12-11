import 'package:api/api.dart';
import 'package:api/src/schema_field.dart';
import 'image.dart';

class Project extends ManagedObject<_Project> implements _Project {
  static Type get interface => _Project;
}

class _Project {
  @Column(primaryKey: true, autoincrement: true)
  int id;

  // Controls if the entry should be displayed on the front-end.
  @SchemaField(type: 'checkbox', required: false)
  bool active;

  @SchemaField()
  String title;

  @Column(nullable: true)
  @SchemaField(type: 'url', required: false)
  String webUrl;

  @SchemaField(type: 'url')
  String codeUrl;

  @SchemaField()
  String displayDate;

  @SchemaField(type: 'date')
  DateTime startedDate;

  @SchemaField()
  String lang;

  @SchemaField(tag: 'textarea', type: null)
  String info;

  @SchemaField()
  String role;

  @SchemaField()
  String stat;

  @SchemaField(tag: 'select', type: null, multiple: true, required: false)
  ManagedSet<Image> images;
}
