import 'package:api/model/image.dart';
import 'package:api/model/user.dart';

import 'harness/app.dart';

Future main() async {
  final Harness harness = Harness()..install();

  Future<Null> insertImage() async {
    final Query<Image> insertQuery = Query<Image>(harness.application.channel.context)
      ..values.path = "/path/to/image.jpg"
      ..values.title = "A cool image"
      ..values.pos = 1
      ..values.orient = "port";

    await insertQuery.insert();
  }

  Future<Null> loginUser() async {
    final User user = User()
      ..username = "test"
      ..password = "password";
    harness.publicAgent = await harness.registerUser(user, withClient: harness.publicAgent);
  }

  test("GET /public/images returns 200 - empty list", () async {
    final TestResponse response = await harness.publicAgent.get("/public/images");

    expectResponse(response, 200, body: hasLength(equals(0)));
  });

  test("GET /public/images returns 200 - one build", () async {
    await insertImage();

    final TestResponse response = await harness.publicAgent.get("/public/images");
    expectResponse(response, 200, body: [{
      "id": greaterThan(0),
      "path": "/path/to/image.jpg",
      "title": "A cool image",
      "pos": 1,
      "orient": "port",
      "build": null,
      "project": null
    }]);
  });
}
