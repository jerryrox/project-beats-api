import express from 'express';

/**
 * Types of supported Node runtime mode.
 */
export enum NodeEnvType {
    Development = "development",
    Production = "production",
    Test= "test"
}

/**
 * Types of API providers currently supported by Project: Beats.
 */
export enum ApiProviderType {
    Osu = "osu",
    Bloodcat = "bloodcat"
}

/**
 * Types of response which the client application should check and react accordingly.
 */
export enum ResponseType {
    Success = "Success",
    OAuthSuccess = "OAuthSuccess",

    Unsupported = "Unsupported",

    Error = "Error",

    RequireLogin = "RequireLogin",
    RequireOAuth = "RequireOAuth",

    Me = "Me",

    Mapsets = "Mapsets",
}

/**
 * Types of game providers available in game.
 * Can be used to offset the game mode index value.
 */
export enum GameProviderType {
    Osu = 0,
    Beats = 10,
}

/**
 * Types of game modes playable within game.
 */
export enum GameModeType {
    OsuStandard = GameProviderType.Osu,
    OsuTaiko = GameProviderType.Osu + 1,
    OsuCatch = GameProviderType.Osu + 2,
    OsuMania = GameProviderType.Osu + 3,

    BeatsStandard = GameProviderType.Beats
}

/**
 * Types of mapset categories.
 */
export enum MapsetCategoryType {
    Any,
    Ranked,
    Qualified,
    Loved,
    Pending,
    Graveyard
}

/**
 * Types of mapset genres.
 */
export enum MapsetGenreType {
    Any,
    Unspecified,
    VideoGame,
    Anime,
    Rock,
    Pop,
    Other,
    Novelty,
    HipHop,
    Electronic
}

/**
 * Types of sorting key for mapset searching.
 */
export enum MapsetSortType {
    Title,
    Artist,
    Difficulty,
    Ranked,
    Rating,
    Plays,
    Favorites,
}

/**
 * Types of mapset languages.
 */
export enum MapsetLanguageType {
    Any,
    Other,
    English,
    Japanese,
    Chinese,
    Instrumental,
    Korean,
    French,
    German,
    Swedish,
    Spanish,
    Italian
}

/**
 * Type of the function for Express route handler.
 */
export type ExpressRoute = (req: express.Request, res: express.Response) => void;

/**
 * Base structure of a mapset.
 */
export interface IMapset {
    id?: number;
    title?: string;
    artist?: string;
    creator?: string;
    source?: string;
    tags?: string;
    coverImage?: string;
    cardImage?: string;
    previewAudio?: string;
    hasVideo?: boolean;
    hasStoryboard?: boolean;
    bpm?: number;
    playCount?: number;
    favoriteCount?: number;
    lastUpdate?: Date;
    status?: string;
    isDisabled?: boolean;
    disabledInformation?: string | null;
    maps: IMap[];
}

/**
 * Base structure of a map.
 */
export interface IMap {
    id?: number;
    version?: string;
    mode?: number;
    difficulty?: number;
    totalDuration?: number;
    hitDuration?: number;
    bpm?: number;
    cs?: number;
    drain?: number;
    accuracy?: number;
    ar?: number;
    circleCount?: number;
    sliderCount?: number;
    spinnerCount?: number;
    totalCount?: number;
}