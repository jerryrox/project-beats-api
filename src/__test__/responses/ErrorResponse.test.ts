import ErrorResponse from '../../responses/failures/ErrorResponse';
import { ResponseType } from '../../utils/Types';

describe("ErrorResponse", () => {
    test("Response state", () => {
        const response = new ErrorResponse(new Error("Lol"));
        expect(response.type).toBe(ResponseType.Error);
        expect(response.data).toBeUndefined();
        expect(response.message).toBe("Lol");
    });
});