import 'package:api/src/schema_maker.dart';
import "package:aqueduct/aqueduct.dart";
import "package:api/api.dart";
import "package:api/model/image.dart";

class ImagesPublicController extends ResourceController {
  ImagesPublicController(this.context);

  ManagedContext context;

  @Operation.get()
  Future<Response> getImages({@Bind.query("schema") bool schema = false}) async {
    final Query<Image> query = Query<Image>(context)
      ..sortBy((i) => i.id, QuerySortOrder.ascending);
    final List<Image> allImages = await query.fetch();

    final Map<String, dynamic> response = {};
    response["items"] = allImages.map((value) => value.asMap()).toList();

    if(schema) {
      response["schema"] = SchemaMaker.build(Image().interface);
    }

    return Response.ok(response);
  }

  @Operation.get("id")
  Future<Response> getImage(@Bind.path("id") int id) async {
    final Query<Image> query = Query<Image>(context)
      ..where((i) => i.id).equalTo(id);
    final Image image = await query.fetchOne();

    if(image == null) {
      return Response.notFound(body: {"message": "image id $id does not exist"});
    }

    return Response.ok(image);
  }
}
