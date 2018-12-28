import "package:aqueduct/aqueduct.dart";
import "package:api/api.dart";
import "package:api/model/project.dart";
import "package:api/model/image.dart";

class ProjectsAdminController extends ResourceController {
  ManagedContext context;

  ProjectsAdminController(this.context);

  @Operation.post()
  Future<Response> addProject() async {
    final Map<String, dynamic> body = await request.body.decode();

    final Project project = await context.transaction((transaction) async {
      final Query<Project> queryAddData = Query<Project>(transaction)
        ..values.title = body["title"] as String
        ..values.webUrl = body["webUrl"] as String
        ..values.codeUrl = body["codeUrl"] as String
        ..values.date = body["date"] as String
        ..values.started = body["started"] as int
        ..values.lang = body["lang"] as String
        ..values.info = body["info"] as String
        ..values.role = body["role"] as String
        ..values.stat = body["stat"] as String
        ..values.active = body["active"] as bool;
      final Project project = await queryAddData.insert();

      final List imageIds = body["images"] as List;
      for(final int imageId in imageIds) {
        final Query<Image> queryRelateImage = Query<Image>(transaction)
          ..where((i) => i.id).equalTo(imageId)
          ..values.project.id = project.id;
        await queryRelateImage.updateOne();
      }

      final Query<Project> complete = Query<Project>(transaction)
        ..where((p) => p.id).equalTo(project.id)
        ..join(set: (p) => p.images);

      return await complete.fetchOne();
    });

    return Response.ok(project);
  }

  @Operation.put("id")
  Future<Response> updateProject(@Bind.path("id") int id) async {
    final Map<String, dynamic> body = await request.body.decode();
    final List imageIds = body["images"] as List;

    final Project project = await context.transaction((transaction) async {
      final Query<Project> queryAddData = Query<Project>(transaction)
        ..values.title = body["title"] as String
        ..values.webUrl = body["webUrl"] as String
        ..values.codeUrl = body["codeUrl"] as String
        ..values.date = body["date"] as String
        ..values.started = body["started"] as int
        ..values.lang = body["lang"] as String
        ..values.info = body["info"] as String
        ..values.role = body["role"] as String
        ..values.stat = body["stat"] as String
        ..values.active = body["active"] as bool
        ..where((p) => p.id).equalTo(id);
      final Project project = await queryAddData.updateOne();

      if(project == null) {
        return null;
      }

      final Query<Image> queryCurrentImages = Query<Image>(transaction)
        ..where((i) => i.project.id).equalTo(id);
      final List<Image> currentImages = await queryCurrentImages.fetch();
      for(final Image currentImage in currentImages) {
        if(!imageIds.contains(currentImage.id)) {
          // Un-relate any images that were removed by this request.
          final Query<Image> queryClearImages = Query<Image>(transaction)
            ..where((i) => i.id).equalTo(currentImage.id)
            ..values.project.id = null;
          await queryClearImages.updateOne();
        }
      }

      for(final int imageId in imageIds) {
        final Query<Image> queryRelateImage = Query<Image>(transaction)
          ..where((i) => i.id).equalTo(imageId)
          ..values.project.id = project.id;
        await queryRelateImage.updateOne();
      }

      final Query<Project> complete = Query<Project>(transaction)
        ..where((p) => p.id).equalTo(project.id)
        ..join(set: (p) => p.images);

      return await complete.fetchOne();
    });

    if(project == null) {
      return Response.notFound(body: {"message": "project id $id does not exist"});
    }

    return Response.ok(project);
  }

  @Operation.delete("id")
  Future<Response> deleteProject(@Bind.path("id") int id) async {
    final Query<Project> query = Query<Project>(context)
      ..where((p) => p.id).equalTo(id);
    final int numDeleted = await query.delete();

    if(numDeleted == 0) {
      return Response.notFound(body: {"message": "project id $id does not exist"});
    }

    return Response.ok({"id": id});
  }
}
