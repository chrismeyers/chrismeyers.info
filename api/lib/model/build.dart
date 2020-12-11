import 'package:api/api.dart';
import 'package:api/src/schema_field.dart';
import 'image.dart';

class Build extends ManagedObject<_Build> implements _Build {
  static Type get interface => _Build;
}

class _Build {
  @Column(primaryKey: true, autoincrement: true)
  int id;

  // Controls if the entry should be displayed on the front-end.
  @SchemaField(type: 'checkbox', required: false)
  bool active;

  @SchemaField()
  String displayDate;

  @SchemaField(type: 'date')
  DateTime startedDate;

  @SchemaField()
  String cpu;

  @Column(nullable: true)
  @SchemaField(required: false)
  String cool;

  @SchemaField()
  String mobo;

  @SchemaField()
  String ram;

  @SchemaField()
  String hdd;

  @Column(nullable: true)
  @SchemaField(required: false)
  String ssd;

  @SchemaField()
  String gpu;

  @SchemaField(tag: 'select', type: null, multiple: false, required: false)
  Image image;
}
