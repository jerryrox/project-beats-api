import OAuthSuccessResponse from '../../responses/OAuthSuccessResponse';
import { ResponseType } from '../../utils/Types';

describe("OAuthSuccessResponse", () => {
    test("Response state", () => {
        const response = new OAuthSuccessResponse({
            accessToken: "asdf",
            expiresIn: 50,
            refreshToken: "ref"
        });
        expect(response.type).toBe(ResponseType.OAuthSuccess);
        expect(response.data).toMatchObject({
            accessToken: "asdf",
            expiresIn: 50,
            refreshToken: "ref"
        });
        expect(response.message).toBeUndefined();
    });
});