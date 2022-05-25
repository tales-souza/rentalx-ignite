"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationsCar1646061253752 = void 0;

var _typeorm = require("typeorm");

class CreateSpecificationsCar1646061253752 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "specifications_car",
      columns: [{
        name: "car_id",
        type: "uuid"
      }, {
        name: "specification_id",
        type: "uuid"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
    await queryRunner.createForeignKey("specifications_car", new _typeorm.TableForeignKey({
      name: "FKSpecificationCar",
      referencedTableName: "specifications",
      referencedColumnNames: ["id"],
      columnNames: ["specification_id"],
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
    await queryRunner.createForeignKey("specifications_car", new _typeorm.TableForeignKey({
      name: "FKCarSpecification",
      referencedTableName: "cars",
      referencedColumnNames: ["id"],
      columnNames: ["car_id"],
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey("specifications_car", "FKCarSpecification");
    await queryRunner.dropForeignKey("specifications_car", "FKSpecificationCar");
    await queryRunner.dropTable("specifications_car");
  }

}

exports.CreateSpecificationsCar1646061253752 = CreateSpecificationsCar1646061253752;