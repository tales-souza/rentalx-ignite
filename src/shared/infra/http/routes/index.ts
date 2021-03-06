import { Router } from "express";

import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { feedbackRoutes } from "./feedback.routes";
import { passwordRoutes } from "./password.routes";
import { rentalRoutes } from "./rentals.routes";
import { sessionRoutes } from "./session.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./usersRoutes.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/", sessionRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes);
router.use("/password", passwordRoutes);
router.use("/feedback", feedbackRoutes);

export { router };
