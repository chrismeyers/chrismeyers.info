import "package:api/api.dart";
import "package:api/src/schema_field.dart";
import "image.dart";

class Build extends ManagedObject<_Build> implements _Build {
  static Type get interface => _Build;
}

class _Build {
  @Column(primaryKey: true, autoincrement: true)
  int id;

  // Controls if the entry should be displayed on the front-end.
  @SchemaField(type: "checkbox", multiple: null, required: false)
  bool active;

  @SchemaField(multiple: null)
  String date;

  // An integer representation (YYYYMMDD) of when the project was started that
  // can be used for sorting.
  //   Ex: February 2018 -> 20180201, Summer 2018 -> 20180601
  @SchemaField(type: "number", multiple: null)
  int started;

  @SchemaField(multiple: null)
  String cpu;

  @Column(nullable: true)
  @SchemaField(multiple: null, required: false)
  String cool;

  @SchemaField(multiple: null)
  String mobo;

  @SchemaField(multiple: null)
  String ram;

  @SchemaField(multiple: null)
  String hdd;

  @Column(nullable: true)
  @SchemaField(multiple: null, required: false)
  String ssd;

  @SchemaField(multiple: null)
  String gpu;

  @SchemaField(type: null, tag: "select", multiple: false, required: false)
  Image image;
}
