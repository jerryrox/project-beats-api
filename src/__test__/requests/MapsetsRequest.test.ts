import MapsetsRequest from '../../requests/MapsetsRequest';
import { MapsetGenreType, MapsetLanguageType, MapsetSortType, MapsetCategoryType } from '../../utils/Types';

describe("MapsetsRequest", () => {
    test("Request state", () => {
        const request = new MapsetsRequest({
            query: {
                cursorId: "cid",
                cursorKey: "asdf",
                "cursor[asdf]": "cv",
                mode: "m",
                category: "c",
                genre: MapsetGenreType.Electronic,
                language: MapsetLanguageType.Instrumental,
                sort: MapsetSortType.Difficulty,
                query: " q ",
                hasVideo: "true",
                isDescending: "a"
            }
        });
        expect(request.cursorId).toBe("cid");
        expect(request.cursorKey).toBe("asdf");
        expect(request.cursorValue).toBe("cv");
        expect(request.mode).toBe(0);
        expect(request.category).toBe(MapsetCategoryType.Ranked);
        expect(request.genre).toBe(MapsetGenreType.Electronic);
        expect(request.language).toBe(MapsetLanguageType.Instrumental);
        expect(request.query).toBe("q");
        expect(request.sort).toBe(MapsetSortType.Difficulty);
        expect(request.hasVideo).toBe(true);
        expect(request.hasStoryboard).toBe(false);
        expect(request.isDescending).toBe(true);
    });
});