import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class addAttandees1650034930867 implements MigrationInterface {
  name = 'addAttandees1650034930867';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'event_attendees_user',
        columns: [
          {
            name: 'eventId',
            type: 'varchar',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'userId',
            type: 'varchar',
            isNullable: false,
            isPrimary: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ['eventId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'event',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['userId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "event_attendees_user"`);
  }
}
