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
    },
    url: {
        soil_url: "https://soil-api-vyom.vercel.app/predict"
    },
    openweather_api: {
        api_key: process.env.OW_API!,
        url: "https://api.openweathermap.org/data/2.5/weather"
    },
    crop_prices_api: {
        api_key: process.env.PRICES_API!,
        url: "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070"
    }
};