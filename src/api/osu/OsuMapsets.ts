import express from 'express';
import axios from 'axios';

import ApiRequest from '../../requests/ApiRequest';
import OsuApi from "./OsuApi";
import ErrorResponse from '../../responses/ErrorResponse';
import MapsetsResponse from '../../responses/MapsetsResponse';
import OsuMapsetsFormatter from './formats/OsuMapsetsFormatter';

export async function mapsets(req: express.Request, res: express.Response) {
    const request = new ApiRequest(req);
    request.assertAccessToken();

    try {
        const response = await axios.get(
            `${OsuApi.baseUrl}/beatmapsets/search`,
            {
                headers: OsuApi.getHeaderWithAuth(request)
            }
        );
        if (response.data.error !== null) {
            throw new Error(response.data.error);
        }
        
        const mapsetsFormatter = new OsuMapsetsFormatter();
        res.json(new MapsetsResponse({
            mapsets: response.data.beatmapsets.map((m: any) => mapsetsFormatter.formatMapset(m)),
            cursor: response.data.cursor,
            total: response.data.total
        }));
    }
    catch (e) {
        res.json(new ErrorResponse(e));
    }
}

export async function mapsetDownload(req: express.Request, res: express.Response) {
    const request = new ApiRequest(req);
    request.assertAccessToken();
}