import SuccessResponse from '../../responses/SuccessResponse';
import { ResponseType } from '../../utils/Types';

describe("SuccessResponse", () => {
    test("Response state", () => {
        const response = new SuccessResponse({
            data: [1, 2, 3],
            message: "My message"
        });
        expect(response.type).toBe(ResponseType.Success);
        expect(response.data).toMatchObject([1, 2, 3]);
        expect(response.message).toBe("My message");
    });
});