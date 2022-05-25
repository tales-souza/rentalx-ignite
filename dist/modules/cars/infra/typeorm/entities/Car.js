"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Car = void 0;

var _typeorm = require("typeorm");

var _uuid = require("uuid");

var _Category = require("./Category");

var _Specification = require("./Specification");

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

let Car = (_dec = (0, _typeorm.Entity)("cars"), _dec2 = (0, _typeorm.PrimaryColumn)(), _dec3 = (0, _typeorm.Column)(), _dec4 = (0, _typeorm.Column)(), _dec5 = (0, _typeorm.Column)(), _dec6 = (0, _typeorm.Column)(), _dec7 = (0, _typeorm.Column)(), _dec8 = (0, _typeorm.Column)(), _dec9 = (0, _typeorm.Column)(), _dec10 = (0, _typeorm.ManyToOne)(() => _Category.Category), _dec11 = (0, _typeorm.JoinColumn)({
  name: "category_id"
}), _dec12 = (0, _typeorm.Column)(), _dec13 = (0, _typeorm.ManyToMany)(() => _Specification.Specification), _dec14 = (0, _typeorm.JoinTable)({
  name: "specifications_car",
  joinColumns: [{
    name: "car_id"
  }],
  inverseJoinColumns: [{
    name: "specification_id"
  }]
}), _dec15 = (0, _typeorm.CreateDateColumn)(), _dec(_class = (_class2 = class Car {
  constructor() {
    _initializerDefineProperty(this, "id", _descriptor, this);

    _initializerDefineProperty(this, "name", _descriptor2, this);

    _initializerDefineProperty(this, "description", _descriptor3, this);

    _initializerDefineProperty(this, "daily_rate", _descriptor4, this);

    _initializerDefineProperty(this, "available", _descriptor5, this);

    _initializerDefineProperty(this, "license_plate", _descriptor6, this);

    _initializerDefineProperty(this, "fine_amount", _descriptor7, this);

    _initializerDefineProperty(this, "brand", _descriptor8, this);

    _initializerDefineProperty(this, "category", _descriptor9, this);

    _initializerDefineProperty(this, "category_id", _descriptor10, this);

    _initializerDefineProperty(this, "specifications", _descriptor11, this);

    _initializerDefineProperty(this, "created_at", _descriptor12, this);

    if (!this.id) {
      this.id = (0, _uuid.v4)();
      this.available = true;
    }
  }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "name", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "description", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "daily_rate", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "available", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "license_plate", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "fine_amount", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "brand", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "category", [_dec10, _dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "category_id", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "specifications", [_dec13, _dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "created_at", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Car = Car;