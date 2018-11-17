import 'dart:async';

import 'package:aqueduct/aqueduct.dart';

class Migration3 extends Migration {
  @override
  Future upgrade() async {
   database.addColumn("_Build", SchemaColumn("started", ManagedPropertyType.integer, isPrimaryKey: false, autoincrement: false, isIndexed: false, isNullable: false, isUnique: false), unencodedInitialValue: "0");


database.addColumn("_Project", SchemaColumn("started", ManagedPropertyType.integer, isPrimaryKey: false, autoincrement: false, isIndexed: false, isNullable: false, isUnique: false), unencodedInitialValue: "0");



  }

  @override
  Future downgrade() async {}

  @override
  Future seed() async {}
}
