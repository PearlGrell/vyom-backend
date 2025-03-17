import type { Request, Response, NextFunction } from "express";

import axios from "axios";
import db from "../database/index.js";
import { settings } from "../config/settings.js";
import { StatusError } from "../middlewares/error.middleware.js";
import { sign } from "../helpers/token.helper.js";

export async function sendCode(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { phone_number } = req.body;
        if (!phone_number) {
            throw new StatusError(400, 'Phone number cannot be empty');
        }
        const otp = Math.floor(Math.random() * 9000 + 1000);
        const url = `${settings.sms.url}${settings.sms.api_key}/SMS/${phone_number}/${otp}`
        const response = await axios.get(url);
        if (response.status === 200) {
            return res.status(200).json({
                message: 'OTP sent successfully',
            });
        }
        else {
            throw new StatusError(400, 'Error sending OTP');
        }
    }
    catch (error) {
        next(error);
    }
}

export async function verifyCode(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { otp, phone_number } = req.body;
        const url = `${settings.sms.url}${settings.sms.api_key}/SMS/VERIFY3/${phone_number}/${otp}`
        const response = await axios.get(url);
        if (response.status === 200) {
            if (response.data.Status === 'Success') {
                db.user.findUnique({
                    where: {
                        phone: phone_number
                    }
                }).then((user) => {
                    if (user) {
                        res.status(200).json({
                            message: 'OTP verified successfully',
                            token: sign(user.id),
                            created: false
                        });
                    }
                    else {
                        const id = crypto.randomUUID();
                        db.user.create({
                            data: {
                                id,
                                phone: phone_number,
                                name: 'User'
                            }
                        }).then((user) => {
                            res.status(200).json({
                                message: 'OTP verified successfully',
                                token: sign(user.id),
                                created: true
                            });
                        }).catch((error) => {
                            next(error);
                        });
                    }
                })
            }
            else {
                throw new StatusError(400, 'Error verifying OTP');
            }
        }
        else {
            throw new StatusError(400, 'Error verifying OTP');
        }
    }
    catch (error) {
        next(error)
    }
}

export async function signIn(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { name } = req.body;
    const id = req.body.id;
    db.user.update({
        where: {
            id: id
        },
        data: {
            name: name
        }
    }).then(() => {
        res.status(200).json({
            message: 'User updated successfully',
        })
    }).catch((error) => {
        next(error);
    });
}