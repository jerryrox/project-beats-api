import MapsetsRequest from '../../requests/MapsetsRequest';
import { MapsetGenreType, MapsetLanguageType, MapsetSortType } from '../../utils/Types';

describe("MapsetsRequest", () => {
    test("findCursorValue", () => {
        const request = new MapsetsRequest({});
        expect(request.findCursorValue()).toBeUndefined();
        expect(request.findCursorValue(null)).toBeUndefined();
        expect(request.findCursorValue(3)).toBeUndefined();
        expect(request.findCursorValue({
            "aa": "val"
        })).toBeUndefined();
        expect(request.findCursorValue({
            "aacursor[a]": "val"
        })).toBeUndefined();
        expect(request.findCursorValue({
            "cursor[a]aa": "val"
        })).toBeUndefined();
        expect(request.findCursorValue({
            "cursor[]": "val"
        })).toBeUndefined();
        expect(request.findCursorValue({
            "cursor[_id]": "val"
        })).toBeUndefined();
        expect(request.findCursorValue({
            "cursor[aa]": "val"
        })).toBe("val");
    });

    test("Request state", () => {
        const request = new MapsetsRequest({
            query: {
                cursorId: "cid",
                "cursor[asdf]": "cv",
                mode: "m",
                category: "c",
                genre: MapsetGenreType.Electronic,
                language: MapsetLanguageType.Instrumental,
                sort: MapsetSortType.Difficulty,
                query: "q",
                hasVideo: "true",
                isDescending: "a"
            }
        });
        expect(request.cursorId).toBe("cid");
        expect(request.cursorValue).toBe("cv");
        expect(request.mode).toBe(0);
        expect(request.category).toBe(0);
        expect(request.genre).toBe(MapsetGenreType.Electronic);
        expect(request.language).toBe(MapsetLanguageType.Instrumental);
        expect(request.query).toBe("q");
        expect(request.sort).toBe(MapsetSortType.Difficulty);
        expect(request.hasVideo).toBe(true);
        expect(request.hasStoryboard).toBe(false);
        expect(request.isDescending).toBe(true);
    });
});