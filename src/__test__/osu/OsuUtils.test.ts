import ApiRequest from '../../requests/ApiRequest';
import OsuUtils from '../../api/osu/OsuUtils';

describe("OsuUtils", () => {
    test("getHeaderWithAuth", () => {
        const request = new ApiRequest({
            headers: {
                authorization: "Bearer heyeyeyeyey"
            }
        });
        let header = OsuUtils.getHeaderWithAuth(request, {
            anotherKey: "anotherValue"
        });
        expect(header).toMatchObject({
            Authorization: "Bearer heyeyeyeyey",
            anotherKey: "anotherValue"
        });

        header = OsuUtils.getHeaderWithAuth(request);
        expect(header).toMatchObject({
            Authorization: "Bearer heyeyeyeyey"
        });
    });
});