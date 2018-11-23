import 'package:api/model/build.dart';
import 'package:api/model/image.dart';
import 'package:api/model/user.dart';

import 'harness/app.dart';

Future main() async {
  final Harness harness = Harness()..install();

  Future<Null> insertBuild() async {
    final Query<Build> insertQuery = Query<Build>(harness.application.channel.context)
      ..values.date = "Sometime long ago"
      ..values.started = 20130101
      ..values.cpu = "Very Fast 9000"
      ..values.cool = "Very Cold"
      ..values.mobo = "Lots of LEDs"
      ..values.ram = "Lots of memory"
      ..values.hdd = "Much storage"
      ..values.ssd = "Much fast storage"
      ..values.gpu = "Nice graphics";

    await insertQuery.insert();
  }

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

  test("GET /public/builds returns 200 - empty list", () async {
    final TestResponse response = await harness.publicAgent.get("/public/builds");
    expectResponse(response, 200, body: hasLength(equals(0)));
  });

  test("GET /public/builds returns 200 - one build", () async {
    await insertBuild();

    final TestResponse response = await harness.publicAgent.get("/public/builds");
    expectResponse(response, 200, body: [{
      "id": greaterThan(0),
      "date": "Sometime long ago",
      "started": 20130101,
      "cpu": "Very Fast 9000",
      "cool": "Very Cold",
      "mobo": "Lots of LEDs",
      "ram": "Lots of memory",
      "hdd": "Much storage",
      "ssd": "Much fast storage",
      "gpu": "Nice graphics",
      "image": null
    }]);
  });

  test("GET /public/builds/:id returns 200 - matching ID", () async {
    await insertBuild();

    final TestResponse response = await harness.publicAgent.get("/public/builds/1");
    expectResponse(response, 200, body: {
      "id": greaterThan(0),
      "date": "Sometime long ago",
      "started": 20130101,
      "cpu": "Very Fast 9000",
      "cool": "Very Cold",
      "mobo": "Lots of LEDs",
      "ram": "Lots of memory",
      "hdd": "Much storage",
      "ssd": "Much fast storage",
      "gpu": "Nice graphics",
      "image": null
    });
  });

  test("GET /public/builds/:id returns 404 - no matching ID", () async {
    final TestResponse response = await harness.publicAgent.get("/public/builds/1234");
    expectResponse(response, 404);
  });

  test("POST /admin/builds returns 400 - invalid_authorization_header", () async {
    final TestResponse response = await harness.publicAgent.post("/admin/builds", body: {});
    expectResponse(response, 400, body: {"error": "invalid_authorization_header"});
  });

  test("POST /admin/builds returns 200 - build added", () async {
    await loginUser();

    final TestResponse response = await harness.publicAgent.post("/admin/builds", body: {
      "date": "Sometime long ago",
      "started": 20130101,
      "cpu": "Very Fast 9000",
      "cool": "Very Cold",
      "mobo": "Lots of LEDs",
      "ram": "Lots of memory",
      "hdd": "Much storage",
      "ssd": "Much fast storage",
      "gpu": "Nice graphics",
      "image": null
    });
    expectResponse(response, 200, body: {
      "id": greaterThan(0),
      "date": "Sometime long ago",
      "started": 20130101,
      "cpu": "Very Fast 9000",
      "cool": "Very Cold",
      "mobo": "Lots of LEDs",
      "ram": "Lots of memory",
      "hdd": "Much storage",
      "ssd": "Much fast storage",
      "gpu": "Nice graphics",
      "image": null
    });

    final Query<Build> fetchQuery = Query<Build>(harness.application.channel.context);
    final List<Build> builds = await fetchQuery.fetch();
    expect(builds.length, equals(1));
  });

  test("PUT /admin/builds/:id returns 200 - build updated", () async {
    await insertBuild();
    await insertImage();
    await loginUser();

    final TestResponse response = await harness.publicAgent.put("/admin/builds/1", body: {
      "date": "Sometime very long ago",
      "started": 20120202,
      "cpu": "Very very Fast 9000",
      "cool": "Very very Cold",
      "mobo": "Lots and lots of LEDs",
      "ram": "Lots and lots of memory",
      "hdd": "Very much storage",
      "ssd": "Very much fast storage",
      "gpu": "VeryNice graphics",
      "image": 1
    });
    expectResponse(response, 200, body: {
      "id": 1,
      "date": "Sometime very long ago",
      "started": 20120202,
      "cpu": "Very very Fast 9000",
      "cool": "Very very Cold",
      "mobo": "Lots and lots of LEDs",
      "ram": "Lots and lots of memory",
      "hdd": "Very much storage",
      "ssd": "Very much fast storage",
      "gpu": "VeryNice graphics",
      "image":  {
        'id': 1,
        'path': '/path/to/image.jpg',
        'title': 'A cool image',
        'pos': 1,
        'orient': 'port',
        'build': {
          'id': 1
        },
        'project': null
      }
    });

    final Query<Build> fetchQuery = Query<Build>(harness.application.channel.context);
    final List<Build> builds = await fetchQuery.fetch();
    expect(builds.length, equals(1));
  });

  test("DELETE /admin/builds/:id returns 200 - build deleted", () async {
    await insertBuild();
    await loginUser();

    final Query<Build> fetchQuery = Query<Build>(harness.application.channel.context);
    List<Build> builds = await fetchQuery.fetch();
    expect(builds.length, equals(1));

    final TestResponse response = await harness.publicAgent.delete("/admin/builds/1");
    expectResponse(response, 200, body: {"id": 1});

    builds = await fetchQuery.fetch();
    expect(builds.length, equals(0));
  });
}
