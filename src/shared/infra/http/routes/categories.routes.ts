import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../../../../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../../../../modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoryController } from "../../../../modules/cars/useCases/listCategories/ListCategoryController";

const upload = multer({ dest: "./tmp" });

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listcategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listcategoryController.handle);

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
  return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
