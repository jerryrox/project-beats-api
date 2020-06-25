import express from 'express';

import ApiRequest from './ApiRequest';
import StringUtils from '../utils/StringUtils';

export default class MapsetsRequest extends ApiRequest {

    cursorId: string | undefined;
    cursorValue: string | undefined;
    mode: number | undefined;
    category: number | undefined;
    genre: number | undefined;
    language: number | undefined;
    sort: number | undefined;
    query: string | undefined;
    hasVideo: boolean;
    hasStoryboard: boolean;
    isDescending: boolean;


    constructor(req: express.Request | any) {
        super(req);

        this.cursorId = req.query?.cursorId;
        this.cursorValue = this.findCursorValue(req.query);
        this.mode = StringUtils.tryParseNumber(req.query?.mode);
        this.category = StringUtils.tryParseNumber(req.query?.category);
        this.genre = StringUtils.tryParseNumber(req.query?.genre);
        this.language = StringUtils.tryParseNumber(req.query?.language);
        this.sort = StringUtils.tryParseNumber(req.query?.sort);
        this.query = req.query?.query;
        this.hasVideo = req.query?.hasVideo === "true" || req.query?.hasVideo === true;
        this.hasStoryboard = req.query?.hasStoryboard === "true";
        this.isDescending = req.query?.isDescending !== "false";
    }

    /**
     * Finds cursor value from specified query and returns it.
     */
    findCursorValue(query?: any) {
        if (query === undefined || query === null || typeof (query) !== "object") {
            return undefined;
        }
        const keys = Object.keys(query);
        for (let i = 0; i < keys.length; i++) {
            if ((/^cursor\[(?!_id)[a-zA-Z0-9-_.]+\]$/).test(keys[i])) {
                return query[keys[i]];
            }
        }
        return undefined;
    }
}