import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";
import { sessionRoutes } from "./session.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./usersRoutes.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/session", sessionRoutes);

export { router };
