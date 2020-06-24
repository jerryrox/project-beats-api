import express from 'express';

import { ApiProvider } from '../../utils/Types';
import AuthRequest from '../../requests/AuthRequest';
import Environment from '../../utils/Environment';
import RequireOAuthResponse from '../../responses/RequireOAuthResponse';
import SuccessResponse from '../../responses/SuccessResponse';
import UnsupportedResponse from '../../responses/UnsupportedResponse';

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

export function authResponse(req: express.Request, res: express.Response): void {
    console.log("authResponse");
    console.log(req.params);
    console.log(req.query);
    res.json(new SuccessResponse());
}