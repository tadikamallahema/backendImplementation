import express from 'express';
import { createLogController, getLogsController, getUsageController } from '../controllers/logController.js';

const logRoutes=express.Router();

logRoutes.post("/:id/logs",createLogController)
logRoutes.get("/:id/logs", getLogsController);
logRoutes.get("/:id/usage", getUsageController);

export default logRoutes;