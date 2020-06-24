import express from 'express';
/**
 * Types of supported Node runtime mode.
 */
export enum NodeEnv {
    Development = "development",
    Production = "production",
    Test= "test"
}

/**
 * Types of API providers currently supported by Project: Beats.
 */
export enum ApiProvider {
    Osu = "osu",
    Bloodcat = "bloodcat"
}

/**
 * Types of response which the client application should check and react accordingly.
 */
export enum ResponseType {
    Success = "Success",
    OAuthSuccess = "OAuthSuccess",

    Unsupported = "Unsupported",

    Error = "Error",

    RequireLogin = "RequireLogin",
    RequireOAuth = "RequireOAuth",
}

/**
 * Type of the function for Express route handler.
 */
export type ExpressRoute = (req: express.Request, res: express.Response) => void;