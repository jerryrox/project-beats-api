import RequireLoginResponse from '../../responses/RequireLoginResponse';
import { ResponseType } from '../../utils/Types';

describe("RequireLoginResponse", () => {
    test("Response state", () => {
        const response = new RequireLoginResponse();
        expect(response.type).toBe(ResponseType.RequireLogin);
        expect(response.data).toBeUndefined();
        expect(response.message).toBe("You must be logged in first.");
    });
});