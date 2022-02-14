import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUseAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUseAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUseAvatarController = new UpdateUseAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUseAvatarController.handle
);

export { usersRoutes };
