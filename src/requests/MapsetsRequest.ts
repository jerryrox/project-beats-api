import express from 'express';

import ApiRequest from './ApiRequest';
import StringUtils from '../utils/StringUtils';
import {
    GameModeType, MapsetCategoryType, MapsetGenreType, MapsetLanguageType,
    MapsetSortType
} from '../utils/Types';

export default class MapsetsRequest extends ApiRequest {

    cursorId: string | undefined;
    cursorKey: string | undefined;
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
        this.cursorKey = req.query?.cursorKey;
        this.cursorValue = req.query ? req.query[`cursor[${this.cursorKey}]`] : undefined;
        this.mode = StringUtils.tryParseNumber(req.query?.mode, GameModeType.OsuStandard);
        this.category = StringUtils.tryParseNumber(req.query?.category, MapsetCategoryType.Any);
        this.genre = StringUtils.tryParseNumber(req.query?.genre, MapsetGenreType.Any);
        this.language = StringUtils.tryParseNumber(req.query?.language, MapsetLanguageType.Any);
        this.sort = StringUtils.tryParseNumber(req.query?.sort, MapsetSortType.Ranked);
        this.query = req.query?.query;
        this.hasVideo = req.query?.hasVideo === "true" || req.query?.hasVideo === true;
        this.hasStoryboard = req.query?.hasStoryboard === "true" || req.query?.hasStoryboard === true;
        this.isDescending = req.query?.isDescending !== "false" && req.query?.isDescending !== false;

        if (typeof (this.query) === "string") {
            this.query = this.query.trim();
        }
    }
}