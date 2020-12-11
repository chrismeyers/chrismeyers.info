import 'dart:async';

import 'package:aqueduct/aqueduct.dart';

class Migration5 extends Migration {
  @override
  Future upgrade() async {
    database.addColumn(
        '_Build',
        SchemaColumn('active', ManagedPropertyType.boolean,
            isPrimaryKey: false,
            autoincrement: false,
            isIndexed: false,
            isNullable: false,
            isUnique: false),
        unencodedInitialValue: 'true');

    database.addColumn(
        '_Project',
        SchemaColumn('active', ManagedPropertyType.boolean,
            isPrimaryKey: false,
            autoincrement: false,
            isIndexed: false,
            isNullable: false,
            isUnique: false),
        unencodedInitialValue: 'true');
  }

  @override
  Future downgrade() async {}

  @override
  Future seed() async {}
}
