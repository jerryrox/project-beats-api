import express from 'express';
import axios from "axios";

import ErrorResponse from '../../responses/ErrorResponse';
import MapsetsResponse from '../../responses/MapsetsResponse';
import BloodcatMapsetsFormatter from './formats/BloodcatMapsetsFormatter';
import MapsetsRequest from '../../requests/MapsetsRequest';
import StringUtils from '../../utils/StringUtils';

export async function mapsets(req: express.Request, res: express.Response) {
    try {
        const request = new MapsetsRequest(req);
        const formatter = new BloodcatMapsetsFormatter();

        const response = await axios.get(
            formatter.getMapsetSearchUrl(request)
        );

        const parsedMapsets: any[] = response.data.map((m: any) => formatter.formatMapset(m));
        const newPage = StringUtils.tryParseNumber(request.cursorValue, 1) + 1;
        const cursor = parsedMapsets.length === 0 ? null : {
            "cursor[page]": newPage
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

export function mapsetDownload(req: express.Request, res: express.Response) {
    res.send(new ErrorResponse(new Error("TODO")));
}