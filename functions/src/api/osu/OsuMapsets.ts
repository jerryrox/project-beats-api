import axios from 'axios';

import ErrorResponse from '../../responses/failures/ErrorResponse';
import MapsetsResponse from '../../responses/MapsetsResponse';
import OsuMapsetsFormatter from './formats/OsuMapsetsFormatter';
import MapsetsRequest from '../../requests/MapsetsRequest';
import OsuUtils from './OsuUtils';
import MapsetDownloadRequest from '../../requests/MapsetDownloadRequest';
import * as functions from "firebase-functions";

export async function mapsets(req: functions.Request, res: functions.Response) {
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

        const cursor = formatter.formatCursorResponse(response.data.cursor);
        
        res.json(new MapsetsResponse({
            mapsets: response.data.beatmapsets.map((m: any) => formatter.formatMapset(m)),
            cursor,
            total: response.data.total
        }));
    }
    catch (e: any) {
        res.json(new ErrorResponse(e));
    }
}

export async function mapsetDownload(req: functions.Request, res: functions.Response) {
    try {
        const request = new MapsetDownloadRequest(req);
        request.assertMapsetId();
        request.assertAccessToken();

        const response = await axios.get(
            `https://chimu.moe/d/${request.mapsetId}/`, {
                responseType: "stream"
            }
        );
        Object.keys(response.headers).forEach((k) => {
            res.setHeader(k, response.headers[k]);
        });
        response.data.pipe(res);
    }
    catch (e: any) {
        res.json(new ErrorResponse(e));
    }
}