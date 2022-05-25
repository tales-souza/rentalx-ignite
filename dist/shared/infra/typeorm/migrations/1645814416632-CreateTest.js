"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTest1645814416632 = void 0;

var _typeorm = require("typeorm");

class CreateTest1645814416632 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "test",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "name",
        type: "varchar"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("test");
  }

}

exports.CreateTest1645814416632 = CreateTest1645814416632;