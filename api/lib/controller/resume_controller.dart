import 'package:aqueduct/aqueduct.dart';
import 'package:api/api.dart';
import 'package:api/src/resume_parser.dart';

class ResumeController extends ResourceController {
  @Operation.get()
  Future<Response> getResume() async {
    final ResumeParser parser =
        ResumeParser('../resume/LaTeX/Meyers_Chris/Meyers_Chris_Resume.tex');

    if (request.path.string.endsWith('/summary')) {
      return Response.ok({
        'languages': parser.getLanguages(),
        'mostRecentJob': parser.getMostRecentJob()
      });
    } else {
      return Response.ok({
        'experience': parser.parseComplexSection('Experience'),
        'education': parser.parseComplexSection('Education'),
        'skills': parser.parseListSection('TechnicalSkills'),
        'lastModified': parser.lastModified.millisecondsSinceEpoch
      });
    }
  }
}
