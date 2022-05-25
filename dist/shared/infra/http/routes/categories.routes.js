"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoriesRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _CreateCategoryController = require("../../../../modules/cars/useCases/createCategory/CreateCategoryController");

var _ImportCategoryController = require("../../../../modules/cars/useCases/importCategory/ImportCategoryController");

var _ListCategoryController = require("../../../../modules/cars/useCases/listCategories/ListCategoryController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upload = (0, _multer.default)({
  dest: "./tmp"
});
const categoriesRoutes = (0, _express.Router)();
exports.categoriesRoutes = categoriesRoutes;
const createCategoryController = new _CreateCategoryController.CreateCategoryController();
const listcategoryController = new _ListCategoryController.ListCategoryController();
const importCategoryController = new _ImportCategoryController.ImportCategoryController();
categoriesRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCategoryController.handle);
categoriesRoutes.get("/", listcategoryController.handle);
categoriesRoutes.post("/import", upload.single("file"), _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, (request, response) => {
  return importCategoryController.handle(request, response);
});