"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserDeleteUsername1644276430259 = void 0;

var _typeorm = require("typeorm");

class AlterUserDeleteUsername1644276430259 {
  async up(queryRunner) {
    await queryRunner.dropColumn("users", "username");
  }

  async down(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "username",
      type: "varchar"
    }));
  }

}

exports.AlterUserDeleteUsername1644276430259 = AlterUserDeleteUsername1644276430259;