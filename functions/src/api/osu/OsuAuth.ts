import axios from "axios";

import { ApiProviderType } from '../../utils/Types';
import OAuthResponse from '../../responses/OAuthResponse';
import AuthResponse from '../../responses/AuthResponse';
import ErrorResponse from '../../responses/failures/ErrorResponse';
import SuccessResponse from '../../responses/SuccessResponse';
import DeepLinker from '../../utils/DeepLinker';
import * as functions from "firebase-functions";
import { firestore } from "firebase-admin";
import WebUtils from "../../utils/WebUtils";

function getAuthRedirUrl(req: functions.Request) {
    return WebUtils.getRedirectionUrl(req, "osuAuthResponse");
}

async function getEnv() {
    return (await firestore().doc("env/env").get()).data()!;
}

export async function auth(req: functions.Request, res: functions.Response): Promise<any> {
    const env = await getEnv();
    const clientId = env.OSU_PRODUCTION_CLIENT_ID;
    const redirectUrl = encodeURIComponent(getAuthRedirUrl(req));
    res.json(new OAuthResponse(`https://osu.ppy.sh/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=public&state=`));
}

export async function authResponse(req: functions.Request, res: functions.Response): Promise<any> {
    const code = req.query.code;
    if (code === undefined) {
        return new SuccessResponse();
    }

    const env = await getEnv();
    const clientId = env.OSU_PRODUCTION_CLIENT_ID;
    const secret = env.OSU_PRODUCTION_SECRET;
    try {
        const response = await axios.post(
            "https://osu.ppy.sh/oauth/token",
            JSON.stringify({
                client_id: clientId,
                client_secret: secret,
                code,
                grant_type: "authorization_code",
                redirect_uri: getAuthRedirUrl(req),
            }),
            {
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            }
        );

        DeepLinker.link(res, new AuthResponse({
            provider: ApiProviderType.Osu,
            accessToken: response.data.access_token
        }));
    }
    catch (e: any) {
        res.json(new ErrorResponse(e));
    }
}