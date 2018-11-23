import 'package:api/model/project.dart';

import './queries.dart';
import 'harness/app.dart';

Future main() async {
  final Harness harness = Harness()..install();
  final Queries queries = Queries(harness);

  test("GET /public/projects returns 200 - empty list", () async {
    final TestResponse response = await harness.publicAgent.get("/public/projects");
    expectResponse(response, 200, body: hasLength(equals(0)));
  });

  test("GET /public/projects returns 200 - one project", () async {
    await queries.insertProject();

    final TestResponse response = await harness.publicAgent.get("/public/projects");
    expectResponse(response, 200, body: [{
      "id": greaterThan(0),
      "title": "A cool project",
      "webUrl": "https://project.website",
      "codeUrl": "https://project.code",
      "date": "A very long time ago",
      "started": 20130101,
      "lang": "Machine Code",
      "info": "I don't know, something",
      "role": "Solo Project",
      "stat": "Complete",
      "images": []
    }]);
  });

  test("GET /public/projects/:id returns 200 - matching ID", () async {
    await queries.insertProject();

    final TestResponse response = await harness.publicAgent.get("/public/projects/1");
    expectResponse(response, 200, body: {
      "id": 1,
      "title": "A cool project",
      "webUrl": "https://project.website",
      "codeUrl": "https://project.code",
      "date": "A very long time ago",
      "started": 20130101,
      "lang": "Machine Code",
      "info": "I don't know, something",
      "role": "Solo Project",
      "stat": "Complete",
      "images": []
    });
  });

  test("GET /public/projects/:id returns 404 - no matching ID", () async {
    final TestResponse response = await harness.publicAgent.get("/public/projects/1234");
    expectResponse(response, 404);
  });

  test("POST /admin/projects returns 400 - invalid_authorization_header", () async {
    final TestResponse response = await harness.publicAgent.post("/admin/projects", body: {});
    expectResponse(response, 400, body: {"error": "invalid_authorization_header"});
  });

  test("POST /admin/projects returns 200 - project added", () async {
    await queries.loginUser();

    final TestResponse response = await harness.publicAgent.post("/admin/projects", body: {
      "title": "A cool project",
      "webUrl": "https://project.website",
      "codeUrl": "https://project.code",
      "date": "A very long time ago",
      "started": 20130101,
      "lang": "Machine Code",
      "info": "I don't know, something",
      "role": "Solo Project",
      "stat": "Complete",
      "images": []
    });
    expectResponse(response, 200, body: {
      "id": greaterThan(0),
      "title": "A cool project",
      "webUrl": "https://project.website",
      "codeUrl": "https://project.code",
      "date": "A very long time ago",
      "started": 20130101,
      "lang": "Machine Code",
      "info": "I don't know, something",
      "role": "Solo Project",
      "stat": "Complete",
      "images": []
    });

    final Query<Project> fetchQuery = Query<Project>(harness.application.channel.context);
    final List<Project> projects = await fetchQuery.fetch();
    expect(projects.length, equals(1));
  });

  test("PUT /admin/projects/:id returns 200 - project updated", () async {
    await queries.insertProject();
    await queries.insertImage();
    await queries.loginUser();

    final TestResponse response = await harness.publicAgent.put("/admin/projects/1", body: {
      "title": "Another cool project",
      "webUrl": "https://project2.website",
      "codeUrl": "https://project2.code",
      "date": "A very very long time ago",
      "started": 20120101,
      "lang": "101010110110011",
      "info": "Yup",
      "role": "Solo Project",
      "stat": "Complete",
      "images": [1]
    });
    expectResponse(response, 200, body: {
      "id": 1,
      "title": "Another cool project",
      "webUrl": "https://project2.website",
      "codeUrl": "https://project2.code",
      "date": "A very very long time ago",
      "started": 20120101,
      "lang": "101010110110011",
      "info": "Yup",
      "role": "Solo Project",
      "stat": "Complete",
      "images":  [{
        "id": 1,
        "path": "/path/to/image.jpg",
        "title": "A cool image",
        "pos": 1,
        "orient": "port",
        "build": null,
        "project": {
          "id": 1
        }
      }]
    });

    final Query<Project> fetchQuery = Query<Project>(harness.application.channel.context);
    final List<Project> projects = await fetchQuery.fetch();
    expect(projects.length, equals(1));
  });

  test("DELETE /admin/projects/:id returns 200 - project deleted", () async {
    await queries.insertProject();
    await queries.loginUser();

    final Query<Project> fetchQuery = Query<Project>(harness.application.channel.context);
    List<Project> projects = await fetchQuery.fetch();
    expect(projects.length, equals(1));

    final TestResponse response = await harness.publicAgent.delete("/admin/projects/1");
    expectResponse(response, 200, body: {"id": 1});

    projects = await fetchQuery.fetch();
    expect(projects.length, equals(0));
  });
}
