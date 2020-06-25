import express from 'express';
import axios from "axios";

import ErrorResponse from '../../responses/ErrorResponse';
import BloodcatApi from "./BloodcatApi";
import MapsetsResponse from '../../responses/MapsetsResponse';
import BloodcatMapsetsFormatter from './formats/BloodcatMapsetsFormatter';
import MapsetsRequest from '../../requests/MapsetsRequest';
import StringUtils from '../../utils/StringUtils';

export async function mapsets(req: express.Request, res: express.Response) {
    const request = new MapsetsRequest(res);

    try {
        const formatter = new BloodcatMapsetsFormatter();

        const status = formatter.categoryConverter.getValue(request.category);
        const mode = formatter.modeConverter.getValue(request.mode);
        const genre = formatter.genreConverter.getValue(request.genre);
        const language = formatter.languageConverter.getValue(request.language);
        const page = StringUtils.tryParseNumber(request.cursorValue, 1);
        const response = await axios.get(
            `${BloodcatApi.baseUrl}?mod=json&c=b&s=${status}&m=${mode}&g=${genre}&l=${language}&p=${page}`
        );

        const parsedMapsets: any[] = response.data.map((m: any) => formatter.formatMapset(m));
        const cursor = parsedMapsets.length === 0 ? null : {
            "cursor[page]": page + 1
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