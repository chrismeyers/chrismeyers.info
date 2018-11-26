import "package:aqueduct/aqueduct.dart";
import "package:api/api.dart";
import "package:api/model/project.dart";

class ProjectsPublicController extends ResourceController {
  ManagedContext context;

  ProjectsPublicController(this.context);

  @Operation.get()
  Future<Response> getProjects() async {
    final Query<Project> query = Query<Project>(context)
      ..join(set: (p) => p.images)
      ..sortBy((p) => p.started, QuerySortOrder.ascending);
    final List<Project> allProjects = await query.fetch();

    for(final Project project in allProjects) {
      project.images.sort((a, b) => a.pos.compareTo(b.pos));
    }

    return Response.ok(allProjects);
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
