import "package:api/api.dart";
import "build.dart";
import "project.dart";

class Image extends ManagedObject<_Image> implements _Image {}

class _Image {
  @Column(primaryKey: true, autoincrement: true)
  int id;

  String path;
  String title;
  int pos;
  String orient;

  @Relate(#image)
  Build build;

  @Relate(#images)
  Project project;
}
