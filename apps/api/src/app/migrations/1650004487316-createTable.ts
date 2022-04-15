import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTable1650004487316 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          { name: 'id', type: 'varchar', isPrimary: true },
          { name: 'name', type: 'varchar', isNullable: false },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: 'event',
        columns: [
          { name: 'id', type: 'varchar', isPrimary: true },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'isOutside', type: 'boolean', isNullable: false },
          { name: 'location', type: 'varchar', isNullable: false },
          { name: 'date', type: 'datetime', isNullable: false },
          { name: 'organizerId', type: 'varchar' },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'event',
      new TableForeignKey({
        columnNames: ['organizerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE event`);

    await queryRunner.query(`DROP TABLE user`);
  }
}
