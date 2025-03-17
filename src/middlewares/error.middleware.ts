import { Request, Response, NextFunction } from "express";

export class StatusError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export default function ErrorMiddleware(
    error: StatusError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(error);

    const status = error instanceof StatusError ? error.status : 500;
    const message = error.message || "Internal Server Error";

    res.status(status).json({
        success: false,
        message
    });
    
    next()
}
