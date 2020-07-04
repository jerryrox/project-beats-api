import OAuthResponse from '../../responses/OAuthResponse';
import { ResponseType } from '../../utils/Types';

describe("OAuthResponse", () => {
    test("Response state", () => {
        const response = new OAuthResponse("myUrl");
        expect(response.type).toBe(ResponseType.OAuth);
        expect(response.data).toMatchObject({
            oauthUrl: "myUrl"
        });
        expect(response.message).toBe("Log in using OAuth.");
    });
});