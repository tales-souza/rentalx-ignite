import { Router } from "express";
import multer from "multer";

import { ActiveAccountController } from "@modules/accounts/useCases/activeAccount/ActiveAccountController";

import uploadConfig from "../../../../config/upload";
import { CreatePasswordComplexController } from "../../../../modules/accounts/useCases/createPasswordComplex/CreatePasswordComplexController";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { GetPasswordComplexController } from "../../../../modules/accounts/useCases/getPasswordComplex/GetPasswordComplexController";
import { ProfileUserController } from "../../../../modules/accounts/useCases/profileUser/ProfileUserController";
import { UpdateUseAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/UpdateUseAvatarController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUseAvatarController = new UpdateUseAvatarController();
const profileUserController = new ProfileUserController();
const createPasswordComplexController = new CreatePasswordComplexController();
const getPasswordComplexController = new GetPasswordComplexController();
const activeAccountController = new ActiveAccountController();

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
  createPasswordComplexController.handle
);

usersRoutes.get(
  "/passwordcomplex",
  ensureAuthenticated,
  ensureAdmin,
  getPasswordComplexController.handle
);

usersRoutes.get("/activeAccount", activeAccountController.handle);

export { usersRoutes };
