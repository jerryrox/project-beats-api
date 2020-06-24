import RequireOAuthResponse from '../../responses/RequireOAuthResponse';
import { ResponseType } from '../../utils/Types';

describe("RequireOAuthResponse", () => {
    test("Response state", () => {
        const response = new RequireOAuthResponse("myUrl");
        expect(response.type).toBe(ResponseType.RequireOAuth);
        expect(response.data).toMatchObject({
            oauthUrl: "myUrl"
        });
        expect(response.message).toBe("Log in using OAuth.");
    });
});