import MapsetsRequest from '../../requests/MapsetsRequest';

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
                genre: "g",
                language: "l",
                query: "q",
                sort: "s",
                hasVideo: "true"
            }
        });
        expect(request.cursorId).toBe("cid");
        expect(request.cursorValue).toBe("cv");
        expect(request.mode).toBe("m");
        expect(request.category).toBe("c");
        expect(request.genre).toBe("g");
        expect(request.language).toBe("l");
        expect(request.query).toBe("q");
        expect(request.sort).toBe("s");
        expect(request.hasVideo).toBe(true);
        expect(request.hasStoryboard).toBe(false);
    });
});