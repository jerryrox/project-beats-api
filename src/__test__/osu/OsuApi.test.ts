import OsuApi from '../../api/osu/OsuApi';
import ApiRequest from '../../requests/ApiRequest';

describe("OsuApi", () => {
    test("getHeaderWithAuth", () => {
        const request = new ApiRequest({
            headers: {
                authorization: "Bearer heyeyeyeyey"
            }
        });
        let header = OsuApi.getHeaderWithAuth(request, {
            anotherKey: "anotherValue"
        });
        expect(header).toMatchObject({
            Authorization: "Bearer heyeyeyeyey",
            anotherKey: "anotherValue"
        });

        header = OsuApi.getHeaderWithAuth(request);
        expect(header).toMatchObject({
            Authorization: "Bearer heyeyeyeyey"
        });
    });
});