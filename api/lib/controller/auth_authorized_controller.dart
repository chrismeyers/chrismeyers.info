import 'package:aqueduct/aqueduct.dart';
import 'package:api/api.dart';

class AuthAuthorizedController extends ResourceController {
  @Operation.get()
  Future<Response> isLoggedIn() async {
    return Response.ok({'logged_in': true});
  }
}
