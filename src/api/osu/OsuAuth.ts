import express from 'express';
import axios from "axios";

import { ApiProviderType } from '../../utils/Types';
import Environment from '../../utils/Environment';
import OAuthResponse from '../../responses/OAuthResponse';
import AuthResponse from '../../responses/AuthResponse';
import ErrorResponse from '../../responses/failures/ErrorResponse';
import SuccessResponse from '../../responses/SuccessResponse';
import DeepLinker from '../../utils/DeepLinker';

function getAuthRedirectUrl(): string {
    return Environment.getAppUrl(`/api/osu/auth/response`);
}

export function auth(req: express.Request, res: express.Response): void {
    const clientId = Environment.getClientId(ApiProviderType.Osu);
    const redirectUrl = encodeURIComponent(getAuthRedirectUrl());
    res.json(new OAuthResponse(
        `https://osu.ppy.sh/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=public&state=`
    ));
}

export async function authResponse(req: express.Request, res: express.Response) {
    const code = req.query.code;
    if (code === undefined) {
        res.json(new SuccessResponse());
        return;
    }

    // const state = req.query.state as string;
    const clientId = Environment.getClientId(ApiProviderType.Osu);
    const secret = Environment.getSecret(ApiProviderType.Osu);
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

        DeepLinker.link(res, new AuthResponse({
            provider: ApiProviderType.Osu,
            accessToken: response.data.access_token
        }));
    }
    catch (e) {
        res.json(new ErrorResponse(e));
    }
}