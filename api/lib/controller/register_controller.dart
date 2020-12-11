import 'dart:async';

import 'package:aqueduct/aqueduct.dart';
import 'package:api/model/user.dart';
import 'package:api/src/api_config.dart';

class RegisterController extends ResourceController {
  RegisterController(this.context, this.authServer, this.config);

  final ManagedContext context;
  final AuthServer authServer;
  final ApiConfig config;

  @Operation.post()
  Future<Response> createUser() async {
    final Map<String, dynamic> body = await request.body.decode();

    // Don't allow public accounts
    if (body['secret'] != config.registrationSecret) {
      return Response.forbidden();
    }

    // Check for required parameters before we spend time hashing
    if (body['username'] == null || body['password'] == null) {
      return Response.badRequest(
          body: {'error': 'username and password required.'});
    }

    final User user = User()..username = body['username'] as String;

    user
      ..salt = AuthUtility.generateRandomSalt()
      ..hashedPassword =
          authServer.hashPassword(body['password'] as String, user.salt);

    return Response.ok(await Query(context, values: user).insert());
  }
}
