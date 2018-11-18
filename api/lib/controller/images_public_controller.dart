import 'package:aqueduct/aqueduct.dart';
import 'package:api/api.dart';
import 'package:api/model/image.dart';

class ImagesPublicController extends ResourceController {
  ManagedContext context;

  ImagesPublicController(this.context);

  @Operation.get()
  Future<Response> getImages() async {
    final Query<Image> query = Query<Image>(context);
    final List<Image> allImages = await query.fetch();

    return Response.ok(allImages);
  }

  @Operation.get("id")
  Future<Response> getImage(@Bind.path("id") int id) async {
    final Query<Image> query = Query<Image>(context)
      ..where((i) => i.id).equalTo(id);
    final Image image = await query.fetchOne();

    return Response.ok(image);
  }
}
