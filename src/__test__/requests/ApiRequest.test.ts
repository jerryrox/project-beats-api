import ApiRequest from '../../requests/ApiRequest';

describe("ApiRequest", () => {
    test("assertAccessToken", () => {
        let request = new ApiRequest({});
        expect(() => request.assertAccessToken()).toThrow();

        request = new ApiRequest({
            body: {
                accessToken: ""
            }
        });
        expect(() => request.assertAccessToken()).toThrow();

        request = new ApiRequest({
            body: {
                accessToken: "asdf"
            }
        });
        expect(() => request.assertAccessToken()).not.toThrow();
    });
});