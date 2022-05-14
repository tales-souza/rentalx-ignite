import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFeedback1652465832598 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "feedback",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "type",
            type: "varchar",
          },
          {
            name: "comment",
            type: "varchar",
          },
          {
            name: "screenshot",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("feedback");
  }
}
