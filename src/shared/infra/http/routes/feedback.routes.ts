import { Router } from "express";

import { CreateFeedbackController } from "../../../../modules/feedback/useCases/CreateFeedbackController";

const feedbackRoutes = Router();

const createFeedbackController = new CreateFeedbackController();

feedbackRoutes.post("/", createFeedbackController.handle);

export { feedbackRoutes };
