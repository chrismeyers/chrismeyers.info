import "package:api/model/build.dart";
import "package:api/model/image.dart";
import "package:api/model/project.dart";
import "package:api/model/user.dart";

import "harness/app.dart";

class Queries {
  Harness _harness;

  Queries(Harness harness) :
    _harness = harness;

  Future<Null> loginUser() async {
    final User user = User()
      ..username = "test"
      ..password = "password";
    _harness.publicAgent = await _harness.registerUser(user, withClient: _harness.publicAgent);
  }

  Future<Null> insertImage() async {
    final Query<Image> insertQuery = Query<Image>(_harness.application.channel.context)
      ..values.path = "/path/to/image.jpg"
      ..values.title = "A cool image"
      ..values.pos = 1
      ..values.orient = "port";

    await insertQuery.insert();
  }

  Future<Null> insertBuild() async {
    final Query<Build> insertQuery = Query<Build>(_harness.application.channel.context)
      ..values.date = "Sometime long ago"
      ..values.started = 20130101
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

  Future<Null> insertProject() async {
    final Query<Project> insertQuery = Query<Project>(_harness.application.channel.context)
      ..values.title = "A cool project"
      ..values.webUrl = "https://project.website"
      ..values.codeUrl = "https://project.code"
      ..values.date = "A very long time ago"
      ..values.started = 20130101
      ..values.lang = "Machine Code"
      ..values.info = "I don't know, something"
      ..values.role = "Solo Project"
      ..values.stat = "Complete"
      ..values.active = true;

    await insertQuery.insert();
  }
}
