import UnsupportedResponse from '../../responses/failures/UnsupportedResponse';
import { ResponseType } from '../../utils/Types';

describe("UnsupportedResponse", () => {
    test("Response state", () => {
        const response = new UnsupportedResponse();
        expect(response.type).toBe(ResponseType.Error);
        expect(response.data).toBeUndefined();
        expect(response.message).toBe("This request is unsupported for the selected provider.");
    });
});