import "package:api/api.dart";
import "image.dart";

class Build extends ManagedObject<_Build> implements _Build {}

class _Build {
  @Column(primaryKey: true, autoincrement: true)
  int id;

  String date;

  // An integer representation (YYYYMMDD) of when the project was started that
  // can be used for sorting.
  //   Ex: February 2018 -> 20180201, Summer 2018 -> 20180601
  int started;

  String cpu;

  @Column(nullable: true)
  String cool;

  String mobo;
  String ram;
  String hdd;

  @Column(nullable: true)
  String ssd;

  String gpu;

  Image image;

  // Controls if the entry should be displayed on the front-end.
  bool active;
}
