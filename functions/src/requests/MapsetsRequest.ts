import ApiRequest from './ApiRequest';
import StringUtils from '../utils/StringUtils';
import * as functions from "firebase-functions";
import {
    GameModeType, MapsetCategoryType, MapsetGenreType, MapsetLanguageType,
    MapsetSortType
} from '../utils/Types';

export default class MapsetsRequest extends ApiRequest {

    cursors: any;
    mode: number | undefined;
    category: number | undefined;
    genre: number | undefined;
    language: number | undefined;
    sort: number | undefined;
    query: string | undefined;
    hasVideo: boolean;
    hasStoryboard: boolean;
    isDescending: boolean;


    constructor(req: functions.Request | any) {
        super(req);

        this.cursors = this.parseCursors(req.query);
        this.mode = StringUtils.tryParseNumber(req.query?.mode, GameModeType.OsuStandard);
        this.category = StringUtils.tryParseNumber(req.query?.category, MapsetCategoryType.Ranked);
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

    /**
     * Parses cursor key value pairs and returns an object representing it.
     */
    parseCursors(query: any | undefined): any {
        if (query === undefined) {
            return {};
        }

        const queryCursor = query.cursor;
        if (queryCursor === null || queryCursor === undefined) {
            return {};
        }
        
        const cursors: any = {};
        Object.keys(queryCursor).forEach((k: string) => {
            cursors[`cursor[${k}]`] = queryCursor[k];
        });
        return cursors;
    }
}