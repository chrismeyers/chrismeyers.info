import 'dart:async';
import 'package:aqueduct/aqueduct.dart';

class Migration7 extends Migration {
  @override
  Future upgrade() async {
    database.addColumn(
        '_Image',
        SchemaColumn('thumbnail', ManagedPropertyType.string,
            isPrimaryKey: false,
            autoincrement: false,
            isIndexed: false,
            isNullable: true,
            isUnique: false));
    database.alterColumn('_authclient', 'redirectURI', (c) {
      c.isUnique = false;
    });
  }

  @override
  Future downgrade() async {}

  @override
  Future seed() async {}
}
