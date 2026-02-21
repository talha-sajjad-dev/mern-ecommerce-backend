import express from "express";
import { authenticateToken, authorize } from "../middleware/auth.middleware.js";
import optionController from "../controllers/option.controller.js";

const optionRouter = express.Router();

optionRouter.post(
    '/', 
    authenticateToken,
    authorize('admin'), 
    optionController.create
);

optionRouter.put(
    '/:id', 
    authenticateToken,
    authorize('admin'),
    optionController.update
);

optionRouter.get(
    '/', 
    authenticateToken,
    optionController.getOptions
);

optionRouter.get(
    '/:id', 
    authenticateToken,
    authorize('admin'),
    optionController.getOptionById
);

export default optionRouter;