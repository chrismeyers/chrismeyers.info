import 'package:api/src/schema_maker.dart';
import "package:aqueduct/aqueduct.dart";
import "package:api/api.dart";
import "package:api/model/build.dart";

class BuildsPublicController extends ResourceController {
  BuildsPublicController(this.context);

  ManagedContext context;

  @Operation.get()
  Future<Response> getBuilds({@Bind.query("schema") bool schema = false}) async {
    final Query<Build> query = Query<Build>(context)
      ..join(object: (b) => b.image)
      ..sortBy((b) => b.started, QuerySortOrder.ascending);
    final List<Build> allBuilds = await query.fetch();

    final Map<String, dynamic> response = {};
    response["items"] = allBuilds.map((value) => value.asMap()).toList();

    if(schema) {
      response["schema"] = SchemaMaker.build(Build().interface);
    }

    return Response.ok(response);
  }

  @Operation.get("id")
  Future<Response> getBuild(@Bind.path("id") int id) async {
    final Query<Build> query = Query<Build>(context)
      ..where((b) => b.id).equalTo(id)
      ..join(object: (b) => b.image);
    final Build build = await query.fetchOne();

    if(build == null) {
      return Response.notFound(body: {"message": "build id $id does not exist"});
    }

    return Response.ok(build);
  }
}
