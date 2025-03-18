import { Router } from "express";
import { getPrices, getParams, getRecommendation, getHealth } from "../controllers/crop.controller.js";

const cropRouter = Router();

cropRouter.get('/', getParams);
cropRouter.get('/prices', getPrices);

cropRouter.post('/recommendation', getRecommendation)
cropRouter.post('/health', getHealth);

export default cropRouter;