import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/upload";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { PasswordComplexController } from "../../../../modules/accounts/useCases/passwordComplex/PasswordComplexController";
import { ProfileUserController } from "../../../../modules/accounts/useCases/profileUser/ProfileUserController";
import { UpdateUseAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUseAvatarController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUseAvatarController = new UpdateUseAvatarController();
const profileUserController = new ProfileUserController();
const passwordComplexController = new PasswordComplexController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUseAvatarController.handle
);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

usersRoutes.post(
  "/passwordcomplex",
  ensureAuthenticated,
  ensureAdmin,
  passwordComplexController.handle
);

export { usersRoutes };
