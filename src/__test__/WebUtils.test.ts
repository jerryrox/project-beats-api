import WebUtils from '../utils/WebUtils';

describe("WebUtils", () => {
    test("addQueryParam", () => {
        expect(WebUtils.addQueryParam("search", "k", "v")).toBe("search?k=v");
        expect(WebUtils.addQueryParam("search?a=b", "k", "v")).toBe("search?a=b&k=v");
        expect(WebUtils.addQueryParam("search?a=c&", "k", "v")).toBe("search?a=c&k=v");
        expect(WebUtils.addQueryParam("search?a=c&", "k[b]", "+")).toBe("search?a=c&k%5Bb%5D=%2B");
    });
});