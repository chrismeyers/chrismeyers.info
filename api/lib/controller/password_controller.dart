import "dart:async";

import "package:aqueduct/aqueduct.dart";
import "package:api/model/user.dart";

class PasswordController extends ResourceController {
  final ManagedContext context;
  final AuthServer authServer;

  PasswordController(this.context, this.authServer);

  @Operation.put()
  Future<Response> updatePassword() async {
    final Map<String, String> body = await request.body.decode();

    // Check for required parameters before we spend time hashing
    if(body["password"] == null) {
      return Response.badRequest(
        body: {"error": "password required."});
    }

    // Get the user based on the auth token.
    final int userId = request.authorization.ownerID;

    final String salt = AuthUtility.generateRandomSalt();
    final Query<User> query = Query<User>(context)
      ..values.salt = salt
      ..values.hashedPassword = authServer.hashPassword(body["password"] as String, salt)
      ..where((u) => u.id).equalTo(userId);

    return Response.ok(await query.updateOne());
 }
}
