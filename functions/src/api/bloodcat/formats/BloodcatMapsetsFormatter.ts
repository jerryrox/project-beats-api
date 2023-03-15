import MapsetsFormatter from '../../../utils/formats/MapsetsFormatter';
import {
    IMapset, IMap, GameModeType, MapsetCategoryType,
    MapsetGenreType, MapsetLanguageType
} from '../../../utils/Types';
import StringUtils from '../../../utils/StringUtils';
import Table from '../../../utils/Table';
import BloodcatApi from "../BloodcatApi";
import MapsetsRequest from '../../../requests/MapsetsRequest';
import WebUtils from '../../../utils/WebUtils';


export default class BloodcatMapsetsFormatter extends MapsetsFormatter {

    static CursorPageKey = "cursor[page]";

    readonly modeConverter: Table;
    readonly categoryConverter: Table;
    readonly genreConverter: Table;
    readonly sortConverter: Table;
    readonly languageConverter: Table;


    constructor() {
        super();
        this.modeConverter = new Table({
            [GameModeType.OsuStandard]: 0,
            [GameModeType.OsuTaiko]: 1,
            [GameModeType.OsuCatch]: 2,
            [GameModeType.OsuMania]: 3,
        });
        this.categoryConverter = new Table({
            [MapsetCategoryType.Any]: "",
            [MapsetCategoryType.Ranked]: "1,2",
            [MapsetCategoryType.Qualified]: 3,
            [MapsetCategoryType.Loved]: 4,
            [MapsetCategoryType.Pending]: 0,
            [MapsetCategoryType.Graveyard]: 0,
        });
        this.genreConverter = new Table({
            [MapsetGenreType.Any]: "",
            [MapsetGenreType.Unspecified]: 1,
            [MapsetGenreType.VideoGame]: 2,
            [MapsetGenreType.Anime]: 3,
            [MapsetGenreType.Rock]: 4,
            [MapsetGenreType.Pop]: 5,
            [MapsetGenreType.Other]: 6,
            [MapsetGenreType.Novelty]: 7,
            [MapsetGenreType.HipHop]: 8,
            [MapsetGenreType.Electronic]: 10,
        });
        this.sortConverter = new Table({});
        this.languageConverter = new Table({
            [MapsetLanguageType.Any]: "",
            [MapsetLanguageType.Other]: 1,
            [MapsetLanguageType.English]: 2,
            [MapsetLanguageType.Japanese]: 3,
            [MapsetLanguageType.Chinese]: 4,
            [MapsetLanguageType.Instrumental]: 5,
            [MapsetLanguageType.Korean]: 6,
            [MapsetLanguageType.French]: 7,
            [MapsetLanguageType.German]: 8,
            [MapsetLanguageType.Swedish]: 9,
            [MapsetLanguageType.Spanish]: 10,
            [MapsetLanguageType.Italian]: 11,
        });
    }

    /**
     * Parses the specified status value to a displayed string format.
     */
    parseStatus(status: string | number | undefined) {
        if (status === "1" || status === 1) {
            return "Ranked";
        }
        if (status === "2" || status === 2) {
            return "Approved";
        }
        if (status === "3" || status === 3) {
            return "Qualified";
        }
        if (status === "4" || status === 4) {
            return "Loved";
        }
        return "Unranked";
    }

    getMapsetSearchUrl(request: MapsetsRequest) {
        let url = WebUtils.addQueryParam(BloodcatApi.baseUrl, "mod", "json");
        url = WebUtils.addQueryParam(url, "c", "b");

        const status = this.categoryConverter.getValue(request.category);
        url = WebUtils.addQueryParam(url, "s", status);

        const mode = this.modeConverter.getValue(request.mode);
        url = WebUtils.addQueryParam(url, "m", mode);

        const genre = this.genreConverter.getValue(request.genre);
        url = WebUtils.addQueryParam(url, "g", genre);

        const language = this.languageConverter.getValue(request.language);
        url = WebUtils.addQueryParam(url, "l", language);

        const pageCursor = request.cursors[BloodcatMapsetsFormatter.CursorPageKey];
        const page = StringUtils.tryParseNumber(pageCursor, 1);
        url = WebUtils.addQueryParam(url, "p", page);

        const query = request.query;
        url = WebUtils.addQueryParam(url, "q", query);
        
        return url;
    }

    formatMapset(data: any): IMapset {
        const maps = data.beatmaps.map((b: any) => this.formatMap(b));
        const hasValidId = typeof (data.id) === "string" && data.id.length > 0;
        return {
            id: StringUtils.tryParseNumber(data.id),
            title: data.title,
            artist: data.artist,
            creator: data.creator,
            source: data.source,
            tags: data.tags,
            coverImage: hasValidId ? `https://assets.ppy.sh/beatmaps/${data.id}/covers/cover.jpg` : undefined,
            cardImage: hasValidId ? `https://assets.ppy.sh/beatmaps/${data.id}/covers/card.jpg` : undefined,
            previewAudio: hasValidId ? `https://b.ppy.sh/preview/${data.id}.mp3` : undefined,
            hasVideo: false,
            hasStoryboard: false,
            bpm: maps[0].bpm,
            playCount: 0,
            favoriteCount: 0,
            lastUpdate: new Date(data.synced),
            status: StringUtils.capitalize(this.parseStatus(data.status)),
            isDisabled: false,
            disabledInformation: null,
            maps
        };
    }

    formatMap(data: any): IMap {
        return {
            id: StringUtils.tryParseNumber(data.id),
            version: data.name,
            mode: StringUtils.tryParseNumber(data.mode),
            difficulty: StringUtils.tryParseNumber(data.star),
            totalDuration: StringUtils.tryParseNumber(data.length),
            hitDuration: StringUtils.tryParseNumber(data.length),
            bpm: StringUtils.tryParseNumber(data.bpm),
            cs: StringUtils.tryParseNumber(data.cs),
            drain: StringUtils.tryParseNumber(data.hp),
            accuracy: StringUtils.tryParseNumber(data.od),
            ar: StringUtils.tryParseNumber(data.ar),
            circleCount: 0,
            sliderCount: 0,
            spinnerCount: 0,
            totalCount: 0,
        };
    }
}