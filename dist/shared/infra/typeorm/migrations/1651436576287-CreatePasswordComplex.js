"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePasswordComplex1651436576287 = void 0;

var _typeorm = require("typeorm");

class CreatePasswordComplex1651436576287 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "password_complex",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "qtt_characters",
        type: "integer"
      }, {
        name: "qtt_uppercase_characters",
        type: "integer"
      }, {
        name: "qtt_lowercase_characters",
        type: "integer"
      }, {
        name: "qtt_numeral_characters",
        type: "integer"
      }, {
        name: "qtt_special_characters",
        type: "integer"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("password_complex");
  }

}

exports.CreatePasswordComplex1651436576287 = CreatePasswordComplex1651436576287;