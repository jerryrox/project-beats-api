import MapsetsFormatter from '../../../utils/formats/MapsetsFormatter';
import {
    IMapset, IMap, GameModeType, MapsetCategoryType,
    MapsetSortType, MapsetLanguageType, MapsetGenreType
} from '../../../utils/Types';
import StringUtils from '../../../utils/StringUtils';
import Table from '../../../utils/Table';

export default class OsuMapsetsFormatter extends MapsetsFormatter {

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
            [MapsetCategoryType.Ranked]: "ranked",
            [MapsetCategoryType.Qualified]: "qualified",
            [MapsetCategoryType.Loved]: "loved",
            [MapsetCategoryType.Pending]: "pending",
            [MapsetCategoryType.Graveyard]: "graveyard",
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
        this.sortConverter = new Table({
            [MapsetSortType.Title]: "title",
            [MapsetSortType.Artist]: "artist",
            [MapsetSortType.Difficulty]: "difficulty",
            [MapsetSortType.Ranked]: "ranked",
            [MapsetSortType.Rating]: "rating",
            [MapsetSortType.Plays]: "plays",
            [MapsetSortType.Favorites]: "favourites",
        });
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

    formatMapset(data: any): IMapset {
        const maps = data.beatmaps.map((b: any) => this.formatMap(b));

        return {
            id: data.id,
            title: data.title,
            artist: data.artist,
            creator: data.creator,
            source: data.source,
            tags: data.tags,
            coverImage: data.covers?.cover,
            cardImage: data.covers?.card,
            previewAudio: `https:${data.preview_url}`,
            hasVideo: data.video,
            hasStoryboard: data.storyboard,
            bpm: data.bpm,
            playCount: data.play_count,
            favoriteCount: data.favourite_count,
            lastUpdate: new Date(data.last_updated),
            status: StringUtils.capitalize(data.status),
            isDisabled: data.availability?.download_disabled, // eslint-disable-line
            disabledInformation: data.availability?.more_information, // eslint-disable-line
            maps
        };
    }

    formatMap(data: any): IMap {
        return {
            id: data.id,
            version: data.version,
            mode: data.mode_int,
            difficulty: data.difficulty_rating,
            totalDuration: data.total_length,
            hitDuration: data.hit_length,
            bpm: data.bpm,
            cs: data.cs,
            drain: data.drain,
            accuracy: data.accuracy,
            ar: data.ar,
            circleCount: data.count_circles,
            sliderCount: data.count_sliders,
            spinnerCount: data.count_spinners,
            totalCount: data.count_total
        };
    }
}