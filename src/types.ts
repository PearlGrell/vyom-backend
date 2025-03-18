import type { StringValue } from "ms";

export enum environment{
    PROD,
    DEV
}

export type TSettings = {
    environment: environment,
    server: {
        port: number
    },
    sms: {
        url : string
        api_key : string
    },
    jwt: {
        secret: string,
        expiresIn: any
    },
    url: {
        soil_url: string
    },
    openweather_api: {
        api_key: string,
        url: string
    },
    crop_prices_api: {
        api_key: string,
        url: string
    }
}