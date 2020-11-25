import "package:api/model/image.dart";
import "package:api/model/project.dart";

import "./queries.dart";
import "harness/app.dart";

Future main() async {
  final Harness harness = Harness()..install();
  final Queries queries = Queries(harness);

  test("GET /public/projects returns 200 - empty list", () async {
    final TestResponse response =
        await harness.publicAgent.get("/public/projects?schema");
    expectResponse(response, 200, body: {"items": [], "schema": isList});
  });

  test("GET /public/projects returns 200 - one project", () async {
    await queries.insertProject();

    final TestResponse response =
        await harness.publicAgent.get("/public/projects");
    expectResponse(response, 200, body: {
      "items": [
        {
          "id": greaterThan(0),
          "title": "A cool project",
          "webUrl": "https://project.website",
          "codeUrl": "https://project.code",
          "displayDate": "A very long time ago",
          "startedDate": "2013-01-01T00:00:00.000Z",
          "lang": "Machine Code",
          "info": "I don't know, something",
          "role": "Solo Project",
          "stat": "Complete",
          "images": [],
          "active": true
        }
      ]
    });
  });

  test("GET /public/projects returns 200 - inactive project excluded",
      () async {
    await queries.insertProject();
    await queries.insertInactiveProject();

    final TestResponse response =
        await harness.publicAgent.get("/public/projects");
    expectResponse(response, 200, body: {"items": hasLength(1)});
  });

  test("GET /public/projects returns 200 - inactive project included",
      () async {
    await queries.insertProject();
    await queries.insertInactiveProject();

    final TestResponse response =
        await harness.publicAgent.get("/public/projects?inactive");
    expectResponse(response, 200, body: {"items": hasLength(2)});
  });

  test(
      "GET /public/projects returns 200 - inactive project included with schema",
      () async {
    await queries.insertProject();
    await queries.insertInactiveProject();

    final TestResponse response =
        await harness.publicAgent.get("/public/projects?inactive&schema");
    expectResponse(response, 200,
        body: {"items": hasLength(2), "schema": isList});
  });

  test("GET /public/projects/:id returns 200 - matching ID", () async {
    await queries.insertProject();

    final TestResponse response =
        await harness.publicAgent.get("/public/projects/1");
    expectResponse(response, 200, body: {
      "id": 1,
      "title": "A cool project",
      "webUrl": "https://project.website",
      "codeUrl": "https://project.code",
      "displayDate": "A very long time ago",
      "startedDate": "2013-01-01T00:00:00.000Z",
      "lang": "Machine Code",
      "info": "I don't know, something",
      "role": "Solo Project",
      "stat": "Complete",
      "images": [],
      "active": true
    });
  });

  test("GET /public/projects/:id returns 404 - inactive project excluded",
      () async {
    await queries.insertInactiveProject();

    final TestResponse response =
        await harness.publicAgent.get("/public/projects/1");
    expectResponse(response, 404, body: {"message": isString});
  });

  test("GET /public/projects/:id returns 200 - inactive project included",
      () async {
    await queries.insertInactiveProject();

    final TestResponse response =
        await harness.publicAgent.get("/public/projects/1?inactive");
    expectResponse(response, 200, body: isMap);
  });

  test("GET /public/projects/:id returns 404 - no matching ID", () async {
    final TestResponse response =
        await harness.publicAgent.get("/public/projects/1234");
    expectResponse(response, 404);
  });

  test("POST /admin/projects returns 400 - invalid_authorization_header",
      () async {
    final TestResponse response =
        await harness.publicAgent.post("/admin/projects", body: {});
    expectResponse(response, 400,
        body: {"error": "invalid_authorization_header"});
  });

  test("POST /admin/projects returns 200 - project added", () async {
    await queries.loginUser();

    final TestResponse response =
        await harness.publicAgent.post("/admin/projects", body: {
      "title": "A cool project",
      "webUrl": "https://project.website",
      "codeUrl": "https://project.code",
      "displayDate": "A very long time ago",
      "startedDate": "2013-01-01T00:00:00.000Z",
      "lang": "Machine Code",
      "info": "I don't know, something",
      "role": "Solo Project",
      "stat": "Complete",
      "images": [],
      "active": false
    });
    expectResponse(response, 200, body: {
      "id": greaterThan(0),
      "title": "A cool project",
      "webUrl": "https://project.website",
      "codeUrl": "https://project.code",
      "displayDate": "A very long time ago",
      "startedDate": "2013-01-01T00:00:00.000Z",
      "lang": "Machine Code",
      "info": "I don't know, something",
      "role": "Solo Project",
      "stat": "Complete",
      "images": [],
      "active": false
    });

    final Query<Project> fetchQuery =
        Query<Project>(harness.application.channel.context);
    final List<Project> projects = await fetchQuery.fetch();
    expect(projects.length, equals(1));
  });

  test("PUT /admin/projects/:id returns 200 - project updated", () async {
    await queries.insertProject();
    await queries.insertImage();
    await queries.loginUser();

    final TestResponse response =
        await harness.publicAgent.put("/admin/projects/1", body: {
      "title": "Another cool project",
      "webUrl": "https://project2.website",
      "codeUrl": "https://project2.code",
      "displayDate": "A very very long time ago",
      "startedDate": "2012-01-01T00:00:00.000Z",
      "lang": "101010110110011",
      "info": "Yup",
      "role": "Solo Project",
      "stat": "Complete",
      "images": [1],
      "active": false
    });
    expectResponse(response, 200, body: {
      "id": 1,
      "title": "Another cool project",
      "webUrl": "https://project2.website",
      "codeUrl": "https://project2.code",
      "displayDate": "A very very long time ago",
      "startedDate": "2012-01-01T00:00:00.000Z",
      "lang": "101010110110011",
      "info": "Yup",
      "role": "Solo Project",
      "stat": "Complete",
      "images": [
        {
          "id": 1,
          "path": "/path/to/image.jpg",
          "thumbnail": "/path/to/thumbnail.jpg",
          "title": "A cool image",
          "pos": 1,
          "orient": "port",
          "build": null,
          "project": {"id": 1}
        }
      ],
      "active": false
    });

    final Query<Project> fetchQuery =
        Query<Project>(harness.application.channel.context);
    final List<Project> projects = await fetchQuery.fetch();
    expect(projects.length, equals(1));
  });

  test("PUT /admin/projects/:id returns 200 - nullify project", () async {
    await queries.insertProject();
    await queries.insertImage();
    await queries.insertImage();
    await queries.loginUser();

    await harness.publicAgent.put("/admin/projects/1", body: {
      "title": "Another cool project",
      "webUrl": "https://project2.website",
      "codeUrl": "https://project2.code",
      "displayDate": "A very very long time ago",
      "startedDate": "2012-01-01T00:00:00.000Z",
      "lang": "101010110110011",
      "info": "Yup",
      "role": "Solo Project",
      "stat": "Complete",
      "images": [1, 2],
      "active": true
    });

    final Query<Project> fetchProjectsQuery =
        Query<Project>(harness.application.channel.context)
          ..join(set: (p) => p.images);
    final fetchImagesQuery = Query<Image>(harness.application.channel.context);

    List<Project> projects = await fetchProjectsQuery.fetch();
    expect(projects[0].images[0].id, 1);
    expect(projects[0].images[1].id, 2);

    List<Image> images = await fetchImagesQuery.fetch();
    expect(images[0].project.id, 1);
    expect(images[1].project.id, 1);

    await harness.publicAgent.put("/admin/projects/1", body: {
      "title": "Another cool project",
      "webUrl": "https://project2.website",
      "codeUrl": "https://project2.code",
      "displayDate": "A very very long time ago",
      "startedDate": "2012-01-01T00:00:00.000Z",
      "lang": "101010110110011",
      "info": "Yup",
      "role": "Solo Project",
      "stat": "Complete",
      "images": [],
      "active": true
    });

    projects = await fetchProjectsQuery.fetch();
    expect(projects[0].images, []);

    images = await fetchImagesQuery.fetch();
    expect(images[0].project, null);
    expect(images[1].project, null);
  });

  test("DELETE /admin/projects/:id returns 200 - project deleted", () async {
    await queries.insertProject();
    await queries.loginUser();

    final Query<Project> fetchQuery =
        Query<Project>(harness.application.channel.context);
    List<Project> projects = await fetchQuery.fetch();
    expect(projects.length, equals(1));

    final TestResponse response =
        await harness.publicAgent.delete("/admin/projects/1");
    expectResponse(response, 200, body: {"id": 1});

    projects = await fetchQuery.fetch();
    expect(projects.length, equals(0));
  });
}
