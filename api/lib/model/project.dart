import "package:api/api.dart";
import "image.dart";

class Project extends ManagedObject<_Project> implements _Project {}

class _Project {
  @Column(primaryKey: true, autoincrement: true)
  int id;

  String title;

  @Column(nullable: true)
  String webUrl;

  String codeUrl;
  String date;

  // An integer representation (YYYYMMDD) of when the project was started that
  // can be used for sorting.
  //   Ex: February 2018 -> 20180201, Summer 2018 -> 20180601
  int started;

  String lang;
  String info;
  String role;
  String stat;

  ManagedSet<Image> images;
}
