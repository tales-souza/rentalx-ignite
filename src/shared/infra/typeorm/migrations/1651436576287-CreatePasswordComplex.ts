import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePasswordComplex1651436576287 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "password_complex",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "qtt_characters",
            type: "integer",
          },
          {
            name: "qtt_uppercase_characters",
            type: "integer",
          },
          {
            name: "qtt_lowercase_characters",
            type: "integer",
          },
          {
            name: "qtt_numeral_characters",
            type: "integer",
          },
          {
            name: "qtt_special_characters",
            type: "integer",
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
    await queryRunner.dropTable("password_complex");
  }
}
