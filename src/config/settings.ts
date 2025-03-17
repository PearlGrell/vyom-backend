import { environment, TSettings } from "./../types.js";
import { config } from 'dotenv';
import type { StringValue } from "ms";


config();

export const settings : TSettings = {
    environment: process.env.ENV === "DEV" ? environment.DEV : environment.PROD,
    server: {
        port : Number(process.env.PORT!)
    },
    sms: {
        url: `https://2factor.in/API/V1/`,
        api_key: process.env.SMS_API_KEY || ''
    },
    jwt:{
        secret: process.env.JWT_SECRET!,
        expiresIn: process.env.JWT_EXPIRES_IN! as StringValue
    }
};