import 'package:aqueduct/aqueduct.dart';
import 'package:api/api.dart';
import 'package:api/model/build.dart';

class BuildsPublicController extends ResourceController {
  ManagedContext context;

  BuildsPublicController(this.context);

  @Operation.get()
  Future<Response> getBuilds() async {
    final Query<Build> query = Query<Build>(context)
      ..join(object: (b) => b.image)
      ..sortBy((b) => b.started, QuerySortOrder.ascending);
    final List<Build> allBuilds = await query.fetch();

    return Response.ok(allBuilds);
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
