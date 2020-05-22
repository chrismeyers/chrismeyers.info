import 'dart:async';
import 'package:aqueduct/aqueduct.dart';

class Migration6 extends Migration {
  @override
  Future upgrade() async {
    database.addColumn(
        "_Build",
        SchemaColumn("displayDate", ManagedPropertyType.string,
            isPrimaryKey: false, autoincrement: false, isIndexed: false, isNullable: false, isUnique: false),
        unencodedInitialValue: "'string'");
    database.addColumn(
        "_Build",
        SchemaColumn("startedDate", ManagedPropertyType.datetime,
            isPrimaryKey: false, autoincrement: false, isIndexed: false, isNullable: false, isUnique: false),
        unencodedInitialValue: "'1900-01-02T00:00:00.000Z'");
    database.deleteColumn("_Build", "date");
    database.deleteColumn("_Build", "started");
    database.addColumn(
        "_Project",
        SchemaColumn("displayDate", ManagedPropertyType.string,
            isPrimaryKey: false, autoincrement: false, isIndexed: false, isNullable: false, isUnique: false),
        unencodedInitialValue: "'string'");
    database.addColumn(
        "_Project",
        SchemaColumn("startedDate", ManagedPropertyType.datetime,
            isPrimaryKey: false, autoincrement: false, isIndexed: false, isNullable: false, isUnique: false),
        unencodedInitialValue: "'1900-01-02T00:00:00.000Z'");
    database.deleteColumn("_Project", "date");
    database.deleteColumn("_Project", "started");
  }

  @override
  Future downgrade() async {}

  @override
  Future seed() async {}
}
