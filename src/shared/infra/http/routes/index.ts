import { Router } from "express";

import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { sessionRoutes } from "./session.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./usersRoutes.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/session", sessionRoutes);
router.use("/cars", carsRoutes);

export { router };
