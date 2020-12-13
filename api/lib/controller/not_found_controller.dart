import 'package:aqueduct/aqueduct.dart';
import 'package:api/api.dart';

class NotFoundController extends ResourceController {
  Future notFound(Request req) async {
    final Response res = Response.notFound(body: {'error': 'route not found'});
    applyCORSHeadersIfNecessary(req, res);
    await req.respond(res);
    logger.info('${req.toDebugString()}');
  }
}
