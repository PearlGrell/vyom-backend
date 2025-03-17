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
    }
}