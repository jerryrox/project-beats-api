import express from 'express';
import axios from "axios";

import { ApiProvider } from '../../utils/Types';
import AuthRequest from '../../requests/AuthRequest';
import Environment from '../../utils/Environment';
import RequireOAuthResponse from '../../responses/RequireOAuthResponse';
import UnsupportedResponse from '../../responses/UnsupportedResponse';
// import OsuAuthUsers from './OsuAuthUsers';
import OAuthSuccessResponse from '../../responses/OAuthSuccessResponse';

export function auth(req: express.Request, res: express.Response): void {
    const request = new AuthRequest(req);

    // New osu API now requires OAuth for loggin in to their service.
    if (request.oauthCode === undefined) {
        const clientId = Environment.getClientId(ApiProvider.Osu);
        const redirectUrl = encodeURIComponent(Environment.getAppUrl("/api/osu/auth/response"));
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
    const code = req.query.code as string;
    // const state = req.query.state as string;

    const clientId = Environment.getClientId(ApiProvider.Osu);
    const secret = Environment.getSecret(ApiProvider.Osu);

    const response = await axios.post("https://osu.ppy.sh/oauth/token", {
        client_id: clientId,
        client_secret: secret,
        code,
        grant_type: "authorization_code",
        redirect_uri: Environment.getAppUrl(),
    });

    res.json(new OAuthSuccessResponse({
        accessToken: response.data.access_token,
        expiresIn: response.data.expires_in,
        refreshToken: response.data.refresh_token
    }));
}