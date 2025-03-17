import { NextFunction, Response, Request } from "express";
import { StatusError } from "../middlewares/error.middleware.js";
import axios from "axios";
import { settings } from "../config/settings.js";

export async function getRecommendations(req: Request, res: Response, next: NextFunction) {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return next(new StatusError(400, "Missing required fields"));
    }

    try {
        const soil_response = await axios.get(settings.url.soil_url, {
            params: {
                latitude: lat, 
                longitude: lon
            }
        });

        const weather_response = await axios.get(settings.openweather_api.url, {
            params: {
                lat: lat,
                lon: lon,
                apiKey: settings.openweather_api.api_key,
                units: "metric"
            }
        });

        const temp = weather_response.data.main.temp;
        const humidity = weather_response.data.main.humidity;
        
        const { n, p, k, ph, rainfall } = soil_response.data;

        res.status(200).json({
            n, p, k, ph, rainfall, temp, humidity
        });
    } catch (err) {
        next(err)
    }
}