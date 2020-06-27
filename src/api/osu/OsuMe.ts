import express from 'express';
import axios from 'axios';

import ErrorResponse from '../../responses/ErrorResponse';
import ApiRequest from '../../requests/ApiRequest';
import OsuApi from "./OsuApi";
import MeResponse from '../../responses/MeResponse';

export async function me(req: express.Request, res: express.Response) {
    try {
        const request = new ApiRequest(req);
        request.assertAccessToken();

        const response = await axios.get(`${OsuApi.baseUrl}/me`);
        res.json(new MeResponse({
            id: response.data.id,
            username: response.data.username,
            avatarImage: response.data.avatar_url,
            coverImage: response.data.cover_url,
            status: response.data.interests,
            profilePage: `https://osu.ppy.sh/users/${response.data.id}`
        }));
    }
    catch (e) {
        res.json(new ErrorResponse(e));
    }
}