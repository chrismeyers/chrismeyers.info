import "package:aqueduct/managed_auth.dart";
import "./queries.dart";
import "harness/app.dart";

Future main() async {
  final Harness harness = Harness()..install();
  final Queries queries = Queries(harness);

  test("POST /auth/register returns 403 - invalid registration secret",
      () async {
    const String username = "newuser";
    const String password = "password";

    final TestResponse response = await harness.publicAgent
        .post("/auth/register", body: {
      "username": username,
      "password": password,
      "secret": "incorrect"
    });
    expectResponse(response, 403, body: isNull);
  });

  test("POST /auth/register returns 400 - missing username", () async {
    const String password = "password";

    final TestResponse response = await harness.publicAgent.post(
        "/auth/register",
        body: {"password": password, "secret": "secret"});
    expectResponse(response, 400, body: {"error": isString});
  });

  test("POST /auth/register returns 400 - missing password", () async {
    const String username = "newuser";

    final TestResponse response = await harness.publicAgent.post(
        "/auth/register",
        body: {"username": username, "secret": "secret"});
    expectResponse(response, 400, body: {"error": isString});
  });

  test("POST /auth/register returns 200 - created user", () async {
    const String username = "newuser";
    const String password = "password";

    final TestResponse response = await harness.publicAgent.post(
        "/auth/register",
        body: {"username": username, "password": password, "secret": "secret"});
    expectResponse(response, 200,
        body: {"id": isInteger, "username": username});
  });

  test("GET /auth/authorize returns 400 - invalid authorization header",
      () async {
    final TestResponse response =
        await harness.publicAgent.get("/auth/authorize");
    expectResponse(response, 400,
        body: {"error": "invalid_authorization_header"});
  });

  test("GET /auth/authorize returns 401 - user unauthorized", () async {
    harness.publicAgent.bearerAuthorization = "invalidtoken123";

    final TestResponse response =
        await harness.publicAgent.get("/auth/authorize");
    expectResponse(response, 401, body: isNull);
  });

  test("GET /auth/authorize returns 200 - user authorized", () async {
    await queries.loginUser();

    final TestResponse response =
        await harness.publicAgent.get("/auth/authorize");
    expectResponse(response, 200, body: {"logged_in": true});
  });

  test("DELETE /auth/logout returns 200 - token deleted", () async {
    const String username = "test";
    const String password = "password";
    await queries.loginUser(username: username, password: password);

    final String token =
        harness.publicAgent.headers['authorization'].split(' ')[1] as String;

    final Query<ManagedAuthToken> tokenQuery =
        Query<ManagedAuthToken>(harness.application.channel.context)
          ..where((token) => token.accessToken).equalTo(token);
    final List<ManagedAuthToken> tokenRecordsBefore = await tokenQuery.fetch();
    expect(tokenRecordsBefore.length, equals(1));

    final TestResponse response =
        await harness.publicAgent.delete("/auth/logout");
    expectResponse(response, 200,
        body: {"id": isInteger, "username": username, "message": isString});

    final List<ManagedAuthToken> tokenRecordsAfter = await tokenQuery.fetch();
    expect(tokenRecordsAfter.length, equals(0));
  });
}
