import BloodcatMapsetsFormatter from '../../api/bloodcat/formats/BloodcatMapsetsFormatter';
import DateUtils from "../../utils/DateUtils";

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
    test("parseStatus", () => {
        const formatter = new BloodcatMapsetsFormatter();
        expect(formatter.parseStatus("1")).toBe("Ranked");
        expect(formatter.parseStatus("2")).toBe("Approved");
        expect(formatter.parseStatus("3")).toBe("Qualified");
        expect(formatter.parseStatus("0")).toBe("Unranked");
        expect(formatter.parseStatus("4")).toBe("Unranked");

        expect(formatter.parseStatus(1)).toBe("Ranked");
        expect(formatter.parseStatus(2)).toBe("Approved");
        expect(formatter.parseStatus(3)).toBe("Qualified");
        expect(formatter.parseStatus(0)).toBe("Unranked");
        expect(formatter.parseStatus(4)).toBe("Unranked");

        expect(formatter.parseStatus("asdf")).toBe("Unranked");
        expect(formatter.parseStatus(undefined)).toBe("Unranked");
    });

    test("formatMap", () => {
        const formatter = new BloodcatMapsetsFormatter();
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
        const formatter = new BloodcatMapsetsFormatter();
        expect(formatter.formatMapset(testMapset)).toMatchObject({
            id: 756528,
            title: "Notorious Thugs",
            artist: "The Notorious B.I.G.",
            creator: "RealMetMuster",
            source: "",
            tags: "english american rap hip hop biggie smalls east coast new york life after death puffy old school 1997 classic gangsta bone thugs-n-harmony black 5840097",
            coverImage: `https://assets.ppy.sh/beatmaps/756528/covers/cover.jpg?${DateUtils.getUnixTime()}`,
            cardImage: `https://assets.ppy.sh/beatmaps/756528/covers/card.jpg?${DateUtils.getUnixTime()}`,
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
});