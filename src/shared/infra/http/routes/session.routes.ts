import { Router } from "express";

import { AuthenticateController } from "../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "../../../../modules/accounts/useCases/refreshToken/RefreshTokenController";

const sessionRoutes = Router();

const authenticateController = new AuthenticateController();
const refreshTokenController = new RefreshTokenController();

sessionRoutes.post("/session", authenticateController.handle);
sessionRoutes.post("/refresh-token", refreshTokenController.handle);

export { sessionRoutes };
