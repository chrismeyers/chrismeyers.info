import "package:api/model/build.dart";
import "package:api/model/image.dart";
import "package:api/model/project.dart";
import "package:api/model/user.dart";

import "harness/app.dart";

class Queries {
  Queries(Harness harness) : _harness = harness;

  final Harness _harness;

  Future<Null> loginUser(
      {String username = "test", String password = "password"}) async {
    final User user = User()
      ..username = username
      ..password = password;
    _harness.publicAgent =
        await _harness.registerUser(user, withClient: _harness.publicAgent);
  }

  Future<Null> insertImage() async {
    final Query<Image> insertQuery =
        Query<Image>(_harness.application.channel.context)
          ..values.path = "/path/to/image.jpg"
          ..values.thumbnail = "/path/to/thumbnail.jpg"
          ..values.title = "A cool image"
          ..values.pos = 1
          ..values.orient = "port";

    await insertQuery.insert();
  }

  Future<Null> insertBuild() async {
    final Query<Build> insertQuery =
        Query<Build>(_harness.application.channel.context)
          ..values.displayDate = "Sometime long ago"
          ..values.startedDate = DateTime.parse("2013-01-01T00:00:00.000Z")
          ..values.cpu = "Very Fast 9000"
          ..values.cool = "Very Cold"
          ..values.mobo = "Lots of LEDs"
          ..values.ram = "Lots of memory"
          ..values.hdd = "Much storage"
          ..values.ssd = "Much fast storage"
          ..values.gpu = "Nice graphics"
          ..values.active = true;

    await insertQuery.insert();
  }

  Future<Null> insertInactiveBuild() async {
    final Query<Build> insertQuery =
        Query<Build>(_harness.application.channel.context)
          ..values.displayDate = "Sometime long ago"
          ..values.startedDate = DateTime.parse("2013-01-01T00:00:00.000Z")
          ..values.cpu = "Very Fast 9000"
          ..values.cool = "Very Cold"
          ..values.mobo = "Lots of LEDs"
          ..values.ram = "Lots of memory"
          ..values.hdd = "Much storage"
          ..values.ssd = "Much fast storage"
          ..values.gpu = "Nice graphics"
          ..values.active = false;

    await insertQuery.insert();
  }

  Future<Null> insertProject() async {
    final Query<Project> insertQuery =
        Query<Project>(_harness.application.channel.context)
          ..values.title = "A cool project"
          ..values.webUrl = "https://project.website"
          ..values.codeUrl = "https://project.code"
          ..values.displayDate = "A very long time ago"
          ..values.startedDate = DateTime.parse("2013-01-01T00:00:00.000Z")
          ..values.lang = "Machine Code"
          ..values.info = "I don't know, something"
          ..values.role = "Solo Project"
          ..values.stat = "Complete"
          ..values.active = true;

    await insertQuery.insert();
  }

  Future<Null> insertInactiveProject() async {
    final Query<Project> insertQuery =
        Query<Project>(_harness.application.channel.context)
          ..values.title = "A cool project"
          ..values.webUrl = "https://project.website"
          ..values.codeUrl = "https://project.code"
          ..values.displayDate = "A very long time ago"
          ..values.startedDate = DateTime.parse("2013-01-01T00:00:00.000Z")
          ..values.lang = "Machine Code"
          ..values.info = "I don't know, something"
          ..values.role = "Solo Project"
          ..values.stat = "Complete"
          ..values.active = false;

    await insertQuery.insert();
  }
}
