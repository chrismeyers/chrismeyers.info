import 'dart:convert';
import 'dart:io';
import 'package:args/args.dart';
import 'package:http/http.dart' as http;
import "package:path/path.dart" show dirname, join;

String apiBaseUrl;
String accessToken;
ArgResults args;

main(List<String> arguments) async {
  handleArgs(arguments);

  final String seedStr = File(join(dirname(Platform.script.path), "seed.json")).readAsStringSync();
  final seed = jsonDecode(seedStr);

  final http.Response tokenResponse = await getAccessToken();
  accessToken = jsonDecode(tokenResponse.body)["access_token"] as String;

  await postImages(seed["images"] as List);
  await postBuilds(seed["builds"] as List);
  await postProjects(seed["projects"] as List);
}

void handleArgs(List<String> arguments) {
  final ArgParser argParser = ArgParser()
    ..addOption("mode", abbr: "m", defaultsTo: "dev", allowed: ["dev", "prod"],
      help: "Specifies the API that should be bootstrapped")
    ..addOption("username", abbr: "u",
      help: "Specifies the admin username (required)")
    ..addOption("password", abbr: "p",
      help: "Specifies the admin password (required)")
    ..addOption("client", abbr: "c",
      help: "Specifies the OAuth 2.0 client (required)")
    ..addFlag('help', abbr: 'h', negatable: false,
      help: "Displays this help information.");

  try {
    args = argParser.parse(arguments);
  }
  catch (e) {
    print(e);
    print(argParser.usage);
    exit(1);
  }

  if(args["help"] == true) {
    print(argParser.usage);
    exit(0);
  }

  if(args["username"] == null || args["password"] == null || args["client"] == null) {
    print("Error: Missing auth credentials.");
    print(argParser.usage);
    exit(0);
  }

  if(args["mode"] == "dev") {
    apiBaseUrl = "http://localhost:8888";
  }
  else if(args["mode"] == "prod") {
    apiBaseUrl = "https://api.chrismeyers.info";
  }
}

Future<http.Response> getAccessToken() async {
  final body = "username=${args["username"]}&password=${args["password"]}&grant_type=password";
  final clientCredentials = Base64Encoder().convert("${args["client"]}:".codeUnits);

  return await http.post(
    "$apiBaseUrl/auth/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic $clientCredentials"
    },
    body: body);
}

void postImages(List images) async {
  for(final image in images) {
    await http.post(
      "$apiBaseUrl/admin/images",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer $accessToken"
      },
      body: jsonEncode(image));
  }
}

void postBuilds(List builds) async {
  for(final build in builds) {
    await http.post(
      "$apiBaseUrl/admin/builds",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer $accessToken"
      },
      body: jsonEncode(build));
  }
}

void postProjects(List projects) async {
  for(final project in projects) {
    await http.post(
      "$apiBaseUrl/admin/projects",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer $accessToken"
      },
      body: jsonEncode(project));
  }
}
