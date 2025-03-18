import { NextFunction, Response, Request, query } from "express";
import { StatusError } from "../middlewares/error.middleware.js";
import axios from "axios";
import { settings } from "../config/settings.js";

export async function getParams(req: Request, res: Response, next: NextFunction) {
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
        next(err);
    }
}

export async function getPrices(req: Request, res: Response, next: NextFunction) {
    const { city, limit, offset } = req.query;
    if (!city) {
        return next(new StatusError(400, "City name is required"));
    }
    try {
        const response = await axios.get(settings.crop_prices_api.url, {
            params: {
                "format": "json",
                "api-key": settings.crop_prices_api.api_key,
                "filters[district]": city,
                "limit": limit || 100,
                "offset": offset || 0
            },
        });
        res.status(200).json({
            status: true,
            data: response.data.records
        });
    }
    catch (err) {
        next(err);
    }
}



/** AI Model */

export async function getRecommendation(req: Request, res: Response, next: NextFunction) {
    const { n, p, k, ph, humidity, temp, rainfall } = req.body;
    if (!(n && p && k && ph && humidity && temp && rainfall)) {
        return next(new StatusError(400, "Missing required fields"));
    }
    try {
        res.status(200).send({
            n, p, k, ph, humidity, temp, rainfall
        });
    }
    catch (err) {
        next(err);
    }
}

export async function getHealth(req: Request, res: Response, next: NextFunction) {
    const fileStream = req.body.file;

    if (!fileStream) {
        return next(new StatusError(400, "Missing required fields"));
    }

    try {
        res.setHeader("Content-Type", "text/html");
        res.send(`<img src="${fileStream}" alt="Health Analysis Image">`);
    } catch (err) {
        next(err);
    }
}