import 'package:api/api.dart';

Future main() async {
  final Application app = Application<ApiChannel>()
    ..options.configurationFilePath = 'config.yaml'
    ..options.port = 8888;

  final int count = Platform.numberOfProcessors ~/ 2;
  await app.start(numberOfInstances: count > 0 ? count : 1);

  print('Application started on port: ${app.options.port}.');
  print('Use Ctrl-C (SIGINT) to stop running the application.');
}
