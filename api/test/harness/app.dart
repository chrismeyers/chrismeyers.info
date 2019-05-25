import "package:api/api.dart";
import "package:api/model/user.dart";
import "package:aqueduct_test/aqueduct_test.dart";

export "package:api/api.dart";
export "package:aqueduct_test/aqueduct_test.dart";
export "package:test/test.dart";
export "package:aqueduct/aqueduct.dart";

/// A testing harness for api.
///
/// A harness for testing an aqueduct application. Example test file:
///
///         void main() {
///           Harness harness = Harness()..install();
///
///           test("GET /path returns 200", () async {
///             final response = await harness.agent.get("/path");
///             expectResponse(response, 200);
///           });
///         }
///
class Harness extends TestHarness<ApiChannel> with TestHarnessAuthMixin<ApiChannel>, TestHarnessORMMixin {
  @override
  ManagedContext get context => channel.context;

  @override
  AuthServer get authServer => channel.authServer;

  String client = "com.aqueduct.public";
  Agent publicAgent;

  @override
  Future onSetUp() async {
    await resetData();
  }

  @override
  Future seed() async {
    publicAgent = await addClient(client);
  }

  Future<Agent> registerUser(User user, {Agent withClient}) async {
    withClient ??= publicAgent;

    final TestRequest req = withClient.request("/auth/register")
      ..body = {"username": user.username, "password": user.password, "secret": "secret"};
    await req.post();

    return loginUser(withClient, user.username, user.password);
  }
}
