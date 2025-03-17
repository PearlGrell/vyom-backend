import { Router } from "express";
import { sendCode, signIn, verifyCode } from "../controllers/auth.controller.js";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post('/send-code', sendCode);
authRouter.post('/verify-code', verifyCode);
authRouter.post('/', AuthMiddleware, signIn);

export default authRouter;