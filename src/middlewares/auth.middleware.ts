import { Request, Response, NextFunction } from "express";
import { StatusError } from "./error.middleware.js";
import { unsign } from "../helpers/token.helper.js";

export async function AuthMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new StatusError(401, "Unauthorized");
        }
        const id = unsign(token);
        if (!id) {
            throw new StatusError(401, "Unauthorized");
        }
        req.body.id = id;
        next();
    } catch (error) {
        next(error);
    }
}
