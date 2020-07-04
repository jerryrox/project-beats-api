import express from 'express';
import axios from "axios";

import ErrorResponse from '../../responses/failures/ErrorResponse';
import MapsetsResponse from '../../responses/MapsetsResponse';
import BloodcatMapsetsFormatter from './formats/BloodcatMapsetsFormatter';
import MapsetsRequest from '../../requests/MapsetsRequest';
import StringUtils from '../../utils/StringUtils';
import MapsetDownloadRequest from '../../requests/MapsetDownloadRequest';
import BloodcatApi from "./BloodcatApi";

export async function mapsets(req: express.Request, res: express.Response) {
    try {
        const request = new MapsetsRequest(req);
        const formatter = new BloodcatMapsetsFormatter();

        const response = await axios.get(
            formatter.getMapsetSearchUrl(request)
        );
        
        const cursorPageKey = BloodcatMapsetsFormatter.CursorPageKey;
        const parsedMapsets: any[] = response.data.map((m: any) => formatter.formatMapset(m));
        const newPage = StringUtils.tryParseNumber(request.cursors[cursorPageKey], 1) + 1;
        const cursor = {
            [cursorPageKey]: newPage
        };

        res.json(new MapsetsResponse({
            mapsets: parsedMapsets,
            cursor
        }));
    }
    catch (e) {
        res.json(new ErrorResponse(e));
    }
}

export async function mapsetDownload(req: express.Request, res: express.Response) {
    try {
        const request = new MapsetDownloadRequest(req);
        request.assertMapsetId();

        const response = await axios.get(`${BloodcatApi.baseUrl}/s/${request.mapsetId}`, {
            responseType: "stream"
        });
        Object.keys(response.headers).forEach((k) => {
            res.setHeader(k, response.headers[k]);
        });
        response.data.pipe(res);
    }
    catch (e) {
        res.json(new ErrorResponse(e));
    }
}