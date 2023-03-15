import axios from 'axios';

import ErrorResponse from '../../responses/failures/ErrorResponse';
import ApiRequest from '../../requests/ApiRequest';
import OsuApi from "./OsuApi";
import MeResponse from '../../responses/MeResponse';
import OsuUtils from './OsuUtils';
import * as functions from "firebase-functions";

export async function me(req: functions.Request, res: functions.Response) {
    try {
        const request = new ApiRequest(req);
        request.assertAccessToken();

        const response = await axios.get(`${OsuApi.baseUrl}/me`, {
            headers: OsuUtils.getHeaderWithAuth(request)
        });
        res.json(new MeResponse({
            id: response.data.id,
            username: response.data.username,
            avatarImage: response.data.avatar_url,
            coverImage: response.data.cover_url,
            status: response.data.interests,
            profilePage: `https://osu.ppy.sh/users/${response.data.id}`
        }));
    }
    catch (e: any) {
        res.json(new ErrorResponse(e));
    }
}