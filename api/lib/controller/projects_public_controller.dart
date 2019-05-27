import "package:aqueduct/aqueduct.dart";
import "package:api/api.dart";
import "package:api/model/project.dart";

class ProjectsPublicController extends ResourceController {
  ProjectsPublicController(this.context);

  ManagedContext context;
  List<Map<String, dynamic>> schema = [
    {"field": "active",  "tag": "input",    "type": "checkbox", "required": false},
    {"field": "title",   "tag": "input",    "type": "text",     "required": true},
    {"field": "webUrl",  "tag": "input",    "type": "url",      "required": false},
    {"field": "codeUrl", "tag": "input",    "type": "url",      "required": true},
    {"field": "date",    "tag": "input",    "type": "text",     "required": true},
    {"field": "started", "tag": "input",    "type": "number",   "required": true},
    {"field": "lang",    "tag": "input",    "type": "text",     "required": true},
    {"field": "info",    "tag": "textarea", "type": "text",     "required": true},
    {"field": "role",    "tag": "input",    "type": "text",     "required": true},
    {"field": "stat",    "tag": "input",    "type": "text",     "required": true},
    {"field": "images",  "tag": "input",    "type": "text",     "required": false}
  ];

  @Operation.get()
  Future<Response> getProjects() async {
    final Query<Project> query = Query<Project>(context)
      ..join(set: (p) => p.images)
      ..sortBy((p) => p.started, QuerySortOrder.ascending);
    final List<Project> allProjects = await query.fetch();

    for(final Project project in allProjects) {
      project.images.sort((a, b) => a.pos.compareTo(b.pos));
    }

    return Response.ok({"items": allProjects.map((value) => value.asMap()).toList(), "schema": schema});
  }

  @Operation.get("id")
  Future<Response> getProject(@Bind.path("id") int id) async {
    final Query<Project> query = Query<Project>(context)
      ..where((p) => p.id).equalTo(id)
      ..join(set: (p) => p.images);
    final Project project = await query.fetchOne();

    if(project == null) {
      return Response.notFound(body: {"message": "project id $id does not exist"});
    }

    return Response.ok(project);
  }
}
