import ApiRequest from '../../requests/ApiRequest';

describe("ApiRequest", () => {
    test("assertAccessToken", () => {
        let request = new ApiRequest({});
        expect(() => request.assertAccessToken()).toThrow();

        request = new ApiRequest({
            headers: {
                authorization: ""
            }
        });
        expect(() => request.assertAccessToken()).toThrow();

        request = new ApiRequest({
            headers: {
                authorization: "Bearerasdf"
            }
        });
        expect(() => request.assertAccessToken()).toThrow();

        request = new ApiRequest({
            headers: {
                authorization: "Bearer asdf"
            }
        });
        expect(request.accessToken).toBe("asdf");
        expect(() => request.assertAccessToken()).not.toThrow();
    });

    test("parseAccessToken", () => {
        const request = new ApiRequest({});
        expect(request.parseAccessToken("Bearer a")).toBe("a");
        expect(request.parseAccessToken("Bearer ")).toBeUndefined();
        expect(request.parseAccessToken("a")).toBeUndefined();
        expect(request.parseAccessToken("Bearer asdf asdf")).toBeUndefined();
    });
});