import AuthResponse from '../../responses/AuthResponse';
import { ResponseType, ApiProviderType } from '../../utils/Types';

describe("OAuthResponse", () => {
    test("Response state", () => {
        const response = new AuthResponse({
            provider: ApiProviderType.Osu,
            accessToken: "asdf"
        });
        expect(response.type).toBe(ResponseType.Auth);
        expect(response.data).toMatchObject({
            provider: ApiProviderType.Osu,
            accessToken: "asdf"
        });
        expect(response.message).toBeUndefined();
    });
});