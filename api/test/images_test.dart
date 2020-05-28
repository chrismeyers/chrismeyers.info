import "package:api/model/image.dart";

import "./queries.dart";
import "harness/app.dart";

Future main() async {
  final Harness harness = Harness()..install();
  final Queries queries = Queries(harness);

  test("GET /public/images returns 200 - empty list", () async {
    final TestResponse response =
        await harness.publicAgent.get("/public/images?schema");
    expectResponse(response, 200, body: {"items": [], "schema": isList});
  });

  test("GET /public/images returns 200 - one image", () async {
    await queries.insertImage();

    final TestResponse response =
        await harness.publicAgent.get("/public/images");
    expectResponse(response, 200, body: {
      "items": [
        {
          "id": greaterThan(0),
          "path": "/path/to/image.jpg",
          "title": "A cool image",
          "pos": 1,
          "orient": "port",
          "build": null,
          "project": null
        }
      ]
    });
  });

  test("GET /public/images/:id returns 200 - matching ID", () async {
    await queries.insertImage();

    final TestResponse response =
        await harness.publicAgent.get("/public/images/1");
    expectResponse(response, 200, body: {
      "id": 1,
      "path": "/path/to/image.jpg",
      "title": "A cool image",
      "pos": 1,
      "orient": "port",
      "build": null,
      "project": null
    });
  });

  test("GET /public/images/:id returns 404 - no matching ID", () async {
    final TestResponse response =
        await harness.publicAgent.get("/public/images/1234");
    expectResponse(response, 404);
  });

  test("POST /admin/images returns 400 - invalid_authorization_header",
      () async {
    final TestResponse response =
        await harness.publicAgent.post("/admin/images", body: {});
    expectResponse(response, 400,
        body: {"error": "invalid_authorization_header"});
  });

  test("POST /admin/images returns 200 - image added", () async {
    await queries.loginUser();

    final TestResponse response =
        await harness.publicAgent.post("/admin/images", body: {
      "path": "/path/to/image.jpg",
      "title": "A cool image",
      "pos": 1,
      "orient": "port"
    });
    expectResponse(response, 200, body: {
      "id": greaterThan(0),
      "path": "/path/to/image.jpg",
      "title": "A cool image",
      "pos": 1,
      "orient": "port",
      "build": null,
      "project": null
    });

    final Query<Image> fetchQuery =
        Query<Image>(harness.application.channel.context);
    final List<Image> builds = await fetchQuery.fetch();
    expect(builds.length, equals(1));
  });

  test("PUT /admin/images/:id returns 200 - image updated", () async {
    await queries.insertImage();
    await queries.loginUser();

    final TestResponse response =
        await harness.publicAgent.put("/admin/images/1", body: {
      "path": "/path/to/another/image.jpg",
      "title": "Another cool image",
      "pos": 2,
      "orient": "land"
    });
    expectResponse(response, 200, body: {
      "id": 1,
      "path": "/path/to/another/image.jpg",
      "title": "Another cool image",
      "pos": 2,
      "orient": "land",
      "build": null,
      "project": null
    });

    final Query<Image> fetchQuery =
        Query<Image>(harness.application.channel.context);
    final List<Image> images = await fetchQuery.fetch();
    expect(images.length, equals(1));
  });

  test("DELETE /admin/images/:id returns 200 - image deleted", () async {
    await queries.insertImage();
    await queries.loginUser();

    final Query<Image> fetchQuery =
        Query<Image>(harness.application.channel.context);
    List<Image> builds = await fetchQuery.fetch();
    expect(builds.length, equals(1));

    final TestResponse response =
        await harness.publicAgent.delete("/admin/images/1");
    expectResponse(response, 200, body: {"id": 1});

    builds = await fetchQuery.fetch();
    expect(builds.length, equals(0));
  });
}
