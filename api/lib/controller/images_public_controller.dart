import "package:aqueduct/aqueduct.dart";
import "package:api/api.dart";
import "package:api/model/image.dart";

class ImagesPublicController extends ResourceController {
  ImagesPublicController(this.context);

  ManagedContext context;
  List<Map<String, dynamic>> schema = [
    {"field": "path",   "tag": "input", "type": "text",   "required": true},
    {"field": "title",  "tag": "input", "type": "text",   "required": true},
    {"field": "pos",    "tag": "input", "type": "number", "required": true},
    {"field": "orient", "tag": "input", "type": "text",   "required": true}
  ];

  @Operation.get()
  Future<Response> getImages() async {
    final Query<Image> query = Query<Image>(context)
      ..sortBy((i) => i.id, QuerySortOrder.ascending);
    final List<Image> allImages = await query.fetch();

    return Response.ok({"items": allImages.map((value) => value.asMap()).toList(), "schema": schema});
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
