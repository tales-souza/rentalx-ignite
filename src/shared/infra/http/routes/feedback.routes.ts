import { Router } from "express";

import { CreateFeedbackController } from "../../../../modules/feedback/useCases/createFeedback/CreateFeedbackController";

const feedbackRoutes = Router();

const createFeedbackController = new CreateFeedbackController();

feedbackRoutes.post("/", createFeedbackController.handle);

export { feedbackRoutes };
