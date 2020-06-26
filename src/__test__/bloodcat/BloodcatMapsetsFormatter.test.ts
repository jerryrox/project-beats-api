import BloodcatMapsetsFormatter from '../../api/bloodcat/formats/BloodcatMapsetsFormatter';
import DateUtils from "../../utils/DateUtils";
import { GameModeType, MapsetCategoryType, MapsetGenreType, MapsetSortType, MapsetLanguageType } from '../../utils/Types';
import MapsetsRequest from '../../requests/MapsetsRequest';
import BloodcatApi from "../../api/bloodcat/BloodcatApi";

const testMapset = {
    "synced": "2020-06-25 08:01:28.892",
    "status": "0",
    "title": "Notorious Thugs",
    "titleU": null,
    "artist": "The Notorious B.I.G.",
    "artistU": null,
    "creatorId": "5840097",
    "creator": "RealMetMuster",
    "rankedAt": null,
    "tags": "english american rap hip hop biggie smalls east coast new york life after death puffy old school 1997 classic gangsta bone thugs-n-harmony black 5840097",
    "source": "",
    "genreId": "9",
    "languageId": "2",
    "id": "756528",
    "beatmaps": [
        {
            "id": "1592488",
            "name": "Notorious",
            "mode": "0",
            "hp": "6",
            "cs": "4",
            "od": "8.8",
            "ar": "9.6",
            "bpm": "154.9200000000002",
            "length": "363",
            "star": "6.23092",
            "hash_md5": "5fca3d22a5ea3b8b3a80435759fe3843",
            "status": "0",
            "author": "RealMetMuster"
        }
    ]
};

const testMap = {
    "id": "1592488",
    "name": "Notorious",
    "mode": "0",
    "hp": "6",
    "cs": "4",
    "od": "8.8",
    "ar": "9.6",
    "bpm": "154.9200000000002",
    "length": "363",
    "star": "6.23092",
    "hash_md5": "5fca3d22a5ea3b8b3a80435759fe3843",
    "status": "0",
    "author": "RealMetMuster"
};

describe("BloodcatMapsetsFormatter", () => {
    const formatter = new BloodcatMapsetsFormatter();

    test("parseStatus", () => {
        expect(formatter.parseStatus("1")).toBe("Ranked");
        expect(formatter.parseStatus("2")).toBe("Approved");
        expect(formatter.parseStatus("3")).toBe("Qualified");
        expect(formatter.parseStatus("4")).toBe("Loved");
        expect(formatter.parseStatus("0")).toBe("Unranked");
        expect(formatter.parseStatus("5")).toBe("Unranked");

        expect(formatter.parseStatus(1)).toBe("Ranked");
        expect(formatter.parseStatus(2)).toBe("Approved");
        expect(formatter.parseStatus(3)).toBe("Qualified");
        expect(formatter.parseStatus(4)).toBe("Loved");
        expect(formatter.parseStatus(0)).toBe("Unranked");
        expect(formatter.parseStatus(5)).toBe("Unranked");

        expect(formatter.parseStatus("asdf")).toBe("Unranked");
        expect(formatter.parseStatus(undefined)).toBe("Unranked");
    });

    test("formatMap", () => {
        expect(formatter.formatMap(testMap)).toMatchObject({
            id: 1592488,
            version: "Notorious",
            mode: 0,
            difficulty: 6.23092,
            totalDuration: 363,
            hitDuration: 363,
            bpm: 154.9200000000002,
            cs: 4,
            drain: 6,
            accuracy: 8.8,
            ar: 9.6,
            circleCount: 0,
            sliderCount: 0,
            spinnerCount: 0,
            totalCount: 0,
        });
    });

    test("formatMapset", () => {
        expect(formatter.formatMapset(testMapset)).toMatchObject({
            id: 756528,
            title: "Notorious Thugs",
            artist: "The Notorious B.I.G.",
            creator: "RealMetMuster",
            source: "",
            tags: "english american rap hip hop biggie smalls east coast new york life after death puffy old school 1997 classic gangsta bone thugs-n-harmony black 5840097",
            coverImage: `https://assets.ppy.sh/beatmaps/756528/covers/cover.jpg`,
            cardImage: `https://assets.ppy.sh/beatmaps/756528/covers/card.jpg`,
            previewAudio: `https://b.ppy.sh/preview/756528.mp3`,
            hasVideo: false,
            hasStoryboard: false,
            bpm: 154.9200000000002,
            playCount: 0,
            favoriteCount: 0,
            lastUpdate: new Date("2020-06-25 08:01:28.892"),
            status: "Unranked",
            isDisabled: false,
            disabledInformation: null,
            maps: [
                {
                    id: 1592488,
                    version: "Notorious",
                    mode: 0,
                    difficulty: 6.23092,
                    totalDuration: 363,
                    hitDuration: 363,
                    bpm: 154.9200000000002,
                    cs: 4,
                    drain: 6,
                    accuracy: 8.8,
                    ar: 9.6,
                    circleCount: 0,
                    sliderCount: 0,
                    spinnerCount: 0,
                    totalCount: 0,
                }
            ]
        });
    });

    test("modeConverter", () => {
        const converter = formatter.modeConverter;
        expect(converter.getValue(GameModeType.OsuStandard)).toBe(0);
        expect(converter.getValue(GameModeType.OsuTaiko)).toBe(1);
        expect(converter.getValue(GameModeType.OsuCatch)).toBe(2);
        expect(converter.getValue(GameModeType.OsuMania)).toBe(3);
    });

    test("categoryConverter", () => {
        const converter = formatter.categoryConverter;
        expect(converter.getValue(MapsetCategoryType.Any)).toBe("");
        expect(converter.getValue(MapsetCategoryType.Ranked)).toBe("1,2");
        expect(converter.getValue(MapsetCategoryType.Qualified)).toBe(3);
        expect(converter.getValue(MapsetCategoryType.Loved)).toBe(4);
        expect(converter.getValue(MapsetCategoryType.Pending)).toBe(0);
        expect(converter.getValue(MapsetCategoryType.Graveyard)).toBe(0);
    });

    test("genreConverter", () => {
        const converter = formatter.genreConverter;
        expect(converter.getValue(MapsetGenreType.Any)).toBe("");
        expect(converter.getValue(MapsetGenreType.Unspecified)).toBe(1);
        expect(converter.getValue(MapsetGenreType.VideoGame)).toBe(2);
        expect(converter.getValue(MapsetGenreType.Anime)).toBe(3);
        expect(converter.getValue(MapsetGenreType.Rock)).toBe(4);
        expect(converter.getValue(MapsetGenreType.Pop)).toBe(5);
        expect(converter.getValue(MapsetGenreType.Other)).toBe(6);
        expect(converter.getValue(MapsetGenreType.Novelty)).toBe(7);
        expect(converter.getValue(MapsetGenreType.HipHop)).toBe(8);
        expect(converter.getValue(MapsetGenreType.Electronic)).toBe(10);
    });

    test("sortConverter", () => {
        const converter = formatter.sortConverter;
        expect(converter.getValue(MapsetSortType.Title)).toBeUndefined();
        expect(converter.getValue(MapsetSortType.Artist)).toBeUndefined();
        expect(converter.getValue(MapsetSortType.Difficulty)).toBeUndefined();
        expect(converter.getValue(MapsetSortType.Ranked)).toBeUndefined();
        expect(converter.getValue(MapsetSortType.Rating)).toBeUndefined();
        expect(converter.getValue(MapsetSortType.Plays)).toBeUndefined();
        expect(converter.getValue(MapsetSortType.Favorites)).toBeUndefined();
    });

    test("languageConverter", () => {
        const converter = formatter.languageConverter;
        expect(converter.getValue(MapsetLanguageType.Any)).toBe("");
        expect(converter.getValue(MapsetLanguageType.Other)).toBe(1);
        expect(converter.getValue(MapsetLanguageType.English)).toBe(2);
        expect(converter.getValue(MapsetLanguageType.Japanese)).toBe(3);
        expect(converter.getValue(MapsetLanguageType.Chinese)).toBe(4);
        expect(converter.getValue(MapsetLanguageType.Instrumental)).toBe(5);
        expect(converter.getValue(MapsetLanguageType.Korean)).toBe(6);
        expect(converter.getValue(MapsetLanguageType.French)).toBe(7);
        expect(converter.getValue(MapsetLanguageType.German)).toBe(8);
        expect(converter.getValue(MapsetLanguageType.Swedish)).toBe(9);
        expect(converter.getValue(MapsetLanguageType.Spanish)).toBe(10);
        expect(converter.getValue(MapsetLanguageType.Italian)).toBe(11);
    });

    test("getMapsetSearchUrl", () => {
        let request = new MapsetsRequest({
            query: {
                cursorId: "cid",
                cursorKey: "page",
                "cursor[page]": "2",
                mode: GameModeType.OsuStandard,
                language: MapsetLanguageType.Any,
                query: " chino",
                hasVideo: "true",
                hasStoryboard: true
            }
        });
        expect(
            formatter.getMapsetSearchUrl(request)
        ).toBe(
            `${BloodcatApi.baseUrl}?mod=json&c=b&s=1,2&m=0&g=&l=&p=2&q=chino`
        );
    });
});