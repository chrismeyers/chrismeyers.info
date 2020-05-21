import "package:aqueduct/aqueduct.dart";
import "package:aqueduct/managed_auth.dart";
import "package:api/api.dart";
import "package:api/model/user.dart";

class LogoutController extends ResourceController {
  LogoutController(this.context);

  ManagedContext context;

  @Operation.post()
  Future<Response> logout() async {
    // For more info see: https://stackoverflow.com/a/56258100
    final int userId = request.authorization.ownerID;
    final String token = request.raw.headers.value("authorization").split(' ')[1];

    // Delete the token from the database.
    final Query<ManagedAuthToken> tokenQuery = Query<ManagedAuthToken>(context)
      ..where((token) => token.accessToken).equalTo(token);
    await tokenQuery.delete();

    // Get the username of the logged out user for the response.
    final Query<User> userQuery = Query<User>(context)..where((u) => u.id).equalTo(userId);
    final User user = await userQuery.fetchOne();

    return Response.ok({"id": userId, "username": user.username, "message": "logged out"});
  }
}
