import 'dart:io';
import 'package:aqueduct/aqueduct.dart';

class ApiConfig extends Configuration {
  ApiConfig(String configPath) : super.fromFile(File(configPath));

  DatabaseConfiguration database;
  String registrationSecret;
}
