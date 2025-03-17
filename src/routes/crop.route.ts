import { Router } from "express";
import { getRecommendations } from "../controllers/crop.controller.js";

const cropRouter = Router();

//cropRouter.get('/prices', getPrices);

cropRouter.get('/recommendation', getRecommendations);
//cropRouter.post('/health', getHealth);\

export default cropRouter;