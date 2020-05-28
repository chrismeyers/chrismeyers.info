import "package:aqueduct/managed_auth.dart";
import "package:api/model/user.dart";
import "./controller/controller.dart";
import "./src/api_config.dart";
import "api.dart";

/// This type initializes an application.
///
/// Override methods in this class to set up routes and initialize services like
/// database connections. See http://aqueduct.io/docs/http/channel/.
class ApiChannel extends ApplicationChannel {
  AuthServer authServer;
  ManagedContext context;
  ApiConfig config;

  /// Initialize services in this method.
  ///
  /// Implement this method to initialize services, read values from [options]
  /// and any other initialization required before constructing [entryPoint].
  ///
  /// This method is invoked prior to [entryPoint] being accessed.
  @override
  Future prepare() async {
    logger.onRecord.listen(
        (rec) => print("$rec ${rec.error ?? ""} ${rec.stackTrace ?? ""}"));

    config = ApiConfig(options.configurationFilePath);

    final ManagedDataModel dataModel =
        ManagedDataModel.fromCurrentMirrorSystem();
    final PostgreSQLPersistentStore psc =
        PostgreSQLPersistentStore.fromConnectionInfo(
            config.database.username,
            config.database.password,
            config.database.host,
            config.database.port,
            config.database.databaseName);

    context = ManagedContext(dataModel, psc);

    final AuthServerDelegate authStorage =
        ManagedAuthDelegate<User>(context, tokenLimit: 10);
    authServer = AuthServer(authStorage);
  }

  /// Construct the request channel.
  ///
  /// Return an instance of some [Controller] that will be the initial receiver
  /// of all [Request]s.
  ///
  /// This method is invoked after [prepare].
  @override
  Controller get entryPoint {
    final Router router = Router();

    router
        .route("/auth/register")
        .link(() => RegisterController(context, authServer, config));

    router.route("/auth/token").link(() => AuthController(authServer));

    router
        .route("/auth/authorize")
        .link(() => Authorizer.bearer(authServer))
        .link(() => AuthAuthorizedController());

    router
        .route("/auth/logout")
        .link(() => Authorizer.bearer(authServer))
        .link(() => LogoutController(context));

    router
        .route("/account/password")
        .link(() => Authorizer.bearer(authServer))
        .link(() => PasswordController(context, authServer));

    router.route("/public/resume[/summary]").link(() => ResumeController());

    router
        .route("/admin/images/[:id]")
        .link(() => Authorizer.bearer(authServer))
        .link(() => ImagesAdminController(context));

    router
        .route("/public/images/[:id]")
        .link(() => ImagesPublicController(context));

    router
        .route("/admin/builds/[:id]")
        .link(() => Authorizer.bearer(authServer))
        .link(() => BuildsAdminController(context));

    router
        .route("/public/builds/[:id]")
        .link(() => BuildsPublicController(context));

    router
        .route("/admin/projects/[:id]")
        .link(() => Authorizer.bearer(authServer))
        .link(() => ProjectsAdminController(context));

    router
        .route("/public/projects/[:id]")
        .link(() => ProjectsPublicController(context));

    return router;
  }
}
