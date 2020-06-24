import express from 'express';
import axios from "axios";

import { ApiProvider } from '../../utils/Types';
import AuthRequest from '../../requests/AuthRequest';
import Environment from '../../utils/Environment';
import RequireOAuthResponse from '../../responses/RequireOAuthResponse';
import OAuthSuccessResponse from '../../responses/OAuthSuccessResponse';
import ErrorResponse from '../../responses/ErrorResponse';
import SuccessResponse from '../../responses/SuccessResponse';

function getAuthRedirectUrl(): string {
    return Environment.getAppUrl(`/api/osu/auth/response`);
}

export function auth(req: express.Request, res: express.Response): void {
    const request = new AuthRequest(req);

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

export async function authResponse(req: express.Request, res: express.Response) {
    const code = req.query.code;
    if (code === undefined) {
        res.json(new SuccessResponse());
        return;
    }

    // const state = req.query.state as string;
    const clientId = Environment.getClientId(ApiProvider.Osu);
    const secret = Environment.getSecret(ApiProvider.Osu);
    try {
        const response = await axios.post(
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

        res.json(new OAuthSuccessResponse({
            accessToken: response.data.access_token,
            expiresIn: response.data.expires_in,
            refreshToken: response.data.refresh_token
        }));
    }
    catch (e) {
        res.json(new ErrorResponse(e));
    }
}