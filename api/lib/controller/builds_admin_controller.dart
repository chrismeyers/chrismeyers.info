import 'package:aqueduct/aqueduct.dart';
import 'package:api/api.dart';
import 'package:api/model/build.dart';
import 'package:api/model/image.dart';

class BuildsAdminController extends ResourceController {
  ManagedContext context;

  BuildsAdminController(this.context);

  @Operation.post()
  Future<Response> addBuild() async {
    final Map<String, dynamic> body = await request.body.decode();
    final int imageId = body["image"]["id"] as int;

    final Build build = await context.transaction((transaction) async {
      final Query<Build> queryAddData = Query<Build>(transaction)
        ..values.date = body["date"] as String
        ..values.started = body["started"] as int
        ..values.cpu = body["cpu"] as String
        ..values.cool = body["cool"] as String
        ..values.mobo = body["mobo"] as String
        ..values.ram = body["ram"] as String
        ..values.hdd = body["hdd"] as String
        ..values.ssd = body["ssd"] as String
        ..values.gpu = body["gpu"] as String;
      final Build build = await queryAddData.insert();

      final Query<Image> queryRelateImage = Query<Image>(transaction)
        ..where((i) => i.id).equalTo(imageId)
        ..values.build.id = build.id;
      await queryRelateImage.updateOne();

      final Query<Build> complete = Query<Build>(transaction)
        ..where((b) => b.id).equalTo(build.id)
        ..join(object: (b) => b.image);

      return await complete.fetchOne();
    });

    return Response.ok(build);
  }

  @Operation.put("id")
  Future<Response> updateBuild(@Bind.path("id") int id) async {
    final Map<String, dynamic> body = await request.body.decode();
    final int imageId = body["image"]["id"] as int;

    final build = await context.transaction((transaction) async {
      final Query<Build> queryUpdateData = Query<Build>(transaction)
        ..values.date = body["date"] as String
        ..values.started = body["started"] as int
        ..values.cpu = body["cpu"] as String
        ..values.cool = body["cool"] as String
        ..values.mobo = body["mobo"] as String
        ..values.ram = body["ram"] as String
        ..values.hdd = body["hdd"] as String
        ..values.ssd = body["ssd"] as String
        ..values.gpu = body["gpu"] as String
        ..where((b) => b.id).equalTo(id);
      final Build build = await queryUpdateData.updateOne();

      if(build == null) {
        return null;
      }

      final Query<Image> queryCurrentImage = Query<Image>(transaction)
        ..where((i) => i.build.id).equalTo(id);
      final Image currentImage = await queryCurrentImage.fetchOne();
      if(currentImage != null && currentImage.id != imageId) {
        // Un-relate the image to prepare for update.
        final Query<Image> queryClearImage = Query<Image>(transaction)
          ..where((i) => i.id).equalTo(currentImage.id)
          ..values.build.id = null;
        await queryClearImage.updateOne();
      }

      final Query<Image> queryRelateImage = Query<Image>(transaction)
        ..where((i) => i.id).equalTo(imageId)
        ..values.build.id = build.id;
      await queryRelateImage.updateOne();

      final Query<Build> complete = Query<Build>(transaction)
        ..where((b) => b.id).equalTo(build.id)
        ..join(object: (b) => b.image);

      return await complete.fetchOne();
    });

    if(build == null) {
      return Response.notFound(body: {"message": "build id $id does not exist"});
    }

    return Response.ok(build);
  }

  @Operation.delete("id")
  Future<Response> deleteBuild(@Bind.path("id") int id) async {
    final Query<Build> query = Query<Build>(context)
      ..where((b) => b.id).equalTo(id);

    final int numDeleted = await query.delete();

    if(numDeleted == 0) {
      return Response.notFound(body: {"message": "build id $id does not exist"});
    }

    return Response.ok({"id": id});
  }
}
