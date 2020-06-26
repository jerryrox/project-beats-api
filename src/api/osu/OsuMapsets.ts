import express from 'express';
import axios from 'axios';

import ApiRequest from '../../requests/ApiRequest';
import ErrorResponse from '../../responses/ErrorResponse';
import MapsetsResponse from '../../responses/MapsetsResponse';
import OsuMapsetsFormatter from './formats/OsuMapsetsFormatter';
import MapsetsRequest from '../../requests/MapsetsRequest';
import OsuUtils from './OsuUtils';

export async function mapsets(req: express.Request, res: express.Response) {
    try {
        const request = new MapsetsRequest(req);
        request.assertAccessToken();
        
        const formatter = new OsuMapsetsFormatter();

        const response = await axios.get(
            formatter.getMapsetSearchUrl(request),
            {
                headers: OsuUtils.getHeaderWithAuth(request)
            }
        );
        if (response.data.error !== null) {
            throw new Error(response.data.error);
        }
        
        res.json(new MapsetsResponse({
            mapsets: response.data.beatmapsets.map((m: any) => formatter.formatMapset(m)),
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

    res.send(new ErrorResponse(new Error("TODO")));
}