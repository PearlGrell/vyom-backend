import { Router } from "express";
import auth_router from './routes/auth.route.js';
import cropRouter from "./routes/crop.route.js";

const router = Router()

router.use('/auth/', auth_router)
router.use('/crop/', cropRouter)

export default router