import express from 'express';
import axios from "axios";

import { ApiProvider } from '../../utils/Types';
import AuthRequest from '../../requests/AuthRequest';
import Environment from '../../utils/Environment';
import RequireOAuthResponse from '../../responses/RequireOAuthResponse';
import UnsupportedResponse from '../../responses/UnsupportedResponse';
// import OsuAuthUsers from './OsuAuthUsers';
import OAuthSuccessResponse from '../../responses/OAuthSuccessResponse';
import ErrorResponse from '../../responses/ErrorResponse';

function getAuthRedirectUrl(): string {
    return Environment.getAppUrl("/api/osu/auth/response");
}

export function auth(req: express.Request, res: express.Response): void {
    const request = new AuthRequest(req);

    // New osu API now requires OAuth for loggin in to their service.
    if (request.oauthCode === undefined) {
        const clientId = Environment.getClientId(ApiProvider.Osu);
        const redirectUrl = encodeURIComponent(getAuthRedirectUrl());
        const oauthState = request.oauthState;
        if (oauthState === undefined) {
            throw new Error("OAuth state must be assigned.");
        }

        res.json(new RequireOAuthResponse(
            `https://osu.ppy.sh/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=identify&state=${oauthState}`
        ));
    }
    else {
        // TODO:
        // const url = "https://osu.ppy.sh/oauth/token";
        res.json(new UnsupportedResponse());
    }
}

export async function authResponse(req: express.Request, res: express.Response) {
    if (req.method === "GET") {
        const code = req.query.code as string;
        // const state = req.query.state as string;
        const clientId = Environment.getClientId(ApiProvider.Osu);
        const secret = Environment.getSecret(ApiProvider.Osu);
        try {
            await axios.post(
                "https://osu.ppy.sh/oauth/token",
                JSON.stringify({
                    client_id: clientId,
                    client_secret: secret,
                    code,
                    grant_type: "authorization_code",
                    redirect_uri: getAuthRedirectUrl(),
                }),
                {
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json"
                    }
                }
            );
        }
        catch (e) {
            res.json(new ErrorResponse(e));
        }
    }
    else if (req.method === "POST") {
        res.json(new OAuthSuccessResponse({
            accessToken: req.body.access_token,
            expiresIn: req.body.expires_in,
            refreshToken: req.body.refresh_token
        }));
    }
    else {
        throw new Error(`Unsupported request method: ${req.method}`);
    }
}