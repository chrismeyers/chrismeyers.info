import 'dart:convert';

import "./queries.dart";
import "harness/app.dart";

Future main() async {
  final Harness harness = Harness()..install();
  final Queries queries = Queries(harness);

  test("PUT /account/password returns 200 - password changed", () async {
    const String username = "test";
    const String oldPassword = "password";
    const String newPassword = "apples";
    await queries.loginUser(username: username, password: oldPassword);

    TestResponse response = await harness.publicAgent.put("/account/password", body: {
      "password": newPassword
    });

    // Make sure PUT /account/password succeeds
    expectResponse(response, 200, body: {
      "id": 1,
      "username": username
    });

    // Try logging in with the old password
    harness.publicAgent.headers['authorization'] = "Basic ${base64.encode("${harness.client}:".codeUnits)}";
    final TestRequest request = harness.publicAgent.request("/auth/token")
      ..encodeBody = false
      ..body = utf8.encode("username=$username&password=$oldPassword&grant_type=password")
      ..contentType = ContentType("application", "x-www-form-urlencoded");
    response = await request.post();

    expectResponse(response, 400, body: {"error": "invalid_grant"});

    // Make sure the new password works
    request.body = utf8.encode("username=$username&password=$newPassword&grant_type=password");
    response = await request.post();

    expectResponse(response, 200, body: {
      "access_token": isString,
      "token_type": "bearer",
      "expires_in": isInteger
    });
  });
}
