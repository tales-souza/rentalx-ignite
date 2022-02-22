import { Router } from "express";

import { AuthenticateController } from "../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const sessionRoutes = Router();

const authenticateController = new AuthenticateController();

sessionRoutes.post("/", authenticateController.handle);

export { sessionRoutes };
