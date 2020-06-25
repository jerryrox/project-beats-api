import express from 'express';

import ApiRequest from './ApiRequest';

export default class MapsetsRequest extends ApiRequest {

    cursorId: string | undefined;
    cursorValue: string | undefined;
    mode: string | undefined;
    category: string | undefined;
    genre: string | undefined;
    language: string | undefined;
    query: string | undefined;
    sort: string | undefined;
    hasVideo: boolean;
    hasStoryboard: boolean;


    constructor(req: express.Request | any) {
        super(req);

        this.cursorId = req.query?.cursorId;
        this.cursorValue = this.findCursorValue(req.query);
        this.mode = req.query?.mode;
        this.category = req.query?.category;
        this.genre = req.query?.genre;
        this.language = req.query?.language;
        this.query = req.query?.query;
        this.sort = req.query?.sort;
        this.hasVideo = req.query?.hasVideo === "true" || req.query?.hasVideo === true;
        this.hasStoryboard = req.query?.hasStoryboard === "true";
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