import 'package:api/api.dart';
import 'image.dart';

class Build extends ManagedObject<_Build> implements _Build {}

class _Build {
  @Column(primaryKey: true, autoincrement: true)
  int id;

  String date;

  // An integer representation (YYYYMD) of when the project was started that
  // can be used for sorting.
  //   Ex: February 2018 -> 201821, Summer 2018 -> 201861
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
}
