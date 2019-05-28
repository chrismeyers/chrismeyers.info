import "package:aqueduct/aqueduct.dart";
import "package:api/api.dart";
import "package:api/model/build.dart";

class BuildsPublicController extends ResourceController {
  BuildsPublicController(this.context);

  ManagedContext context;
  List<Map<String, dynamic>> schema = [
    {"field": "active",  "tag": "input",  "type": "checkbox", "required": false},
    {"field": "date",    "tag": "input",  "type": "text",     "required": true},
    {"field": "started", "tag": "input",  "type": "number",   "required": true},
    {"field": "cpu",     "tag": "input",  "type": "text",     "required": true},
    {"field": "cool",    "tag": "input",  "type": "text",     "required": false},
    {"field": "mobo",    "tag": "input",  "type": "text",     "required": true},
    {"field": "ram",     "tag": "input",  "type": "text",     "required": true},
    {"field": "hdd",     "tag": "input",  "type": "text",     "required": true},
    {"field": "ssd",     "tag": "input",  "type": "text",     "required": false},
    {"field": "gpu",     "tag": "input",  "type": "text",     "required": true},
    {"field": "image",   "tag": "select", "multiple": false,  "required": false}
  ];

  @Operation.get()
  Future<Response> getBuilds() async {
    final Query<Build> query = Query<Build>(context)
      ..join(object: (b) => b.image)
      ..sortBy((b) => b.started, QuerySortOrder.ascending);
    final List<Build> allBuilds = await query.fetch();

    return Response.ok({"items": allBuilds.map((value) => value.asMap()).toList(), "schema": schema});
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
