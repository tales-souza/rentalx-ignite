"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateFeedback1652465832598 = void 0;

var _typeorm = require("typeorm");

class CreateFeedback1652465832598 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "feedback",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "type",
        type: "varchar"
      }, {
        name: "comment",
        type: "varchar"
      }, {
        name: "screenshot",
        type: "varchar",
        isNullable: true
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("feedback");
  }

}

exports.CreateFeedback1652465832598 = CreateFeedback1652465832598;