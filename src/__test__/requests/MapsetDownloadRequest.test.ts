import MapsetDownloadRequest from '../../requests/MapsetDownloadRequest';

describe("MapsetDownloadRequest", () => {
    test("Request state", () => {
        let request = new MapsetDownloadRequest({
            params: {
                id: "123456"
            }
        });
        expect(request.mapsetId).toBe("123456");
        expect(() => request.assertMapsetId()).not.toThrow();

        request = new MapsetDownloadRequest({});
        expect(request.mapsetId).toBeUndefined();
        expect(() => request.assertMapsetId()).toThrow();
    });
});