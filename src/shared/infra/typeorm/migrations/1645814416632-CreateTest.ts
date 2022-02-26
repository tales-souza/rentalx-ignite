import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTest1645814416632 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "test",

        columns: [
          {
            name: "id",

            type: "uuid",

            isPrimary: true,
          },

          {
            name: "name",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("test");
  }
}
