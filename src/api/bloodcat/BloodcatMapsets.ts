import express from 'express';
import axios from "axios";

import ErrorResponse from '../../responses/ErrorResponse';
import BloodcatApi from "./BloodcatApi";
import MapsetsResponse from '../../responses/MapsetsResponse';
import BloodcatMapsetsFormatter from './formats/BloodcatMapsetsFormatter';

export async function mapsets(req: express.Request, res: express.Response) {

    try {
        const response = await axios.get(
            `${BloodcatApi.baseUrl}?mod=json`
        );

        const formatter = new BloodcatMapsetsFormatter();
        res.json(new MapsetsResponse({
            mapsets: response.data.map((m: any) => formatter.formatMapset(m)),
            cursor: null // TODO: Null if no mapsets. Otherwise, next page number.
        }));
    }
    catch (e) {
        res.json(new ErrorResponse(e));
    }
}

export function mapsetDownload(req: express.Request, res: express.Response) {
    res.send(new ErrorResponse(new Error("TODO")));
}