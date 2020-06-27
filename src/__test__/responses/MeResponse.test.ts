import MeResponse from '../../responses/MeResponse';
import { ResponseType } from '../../utils/Types';

describe("MeResponse", () => {
    test("Response state", () => {
        const response = new MeResponse({
            id: "asdf",
            username: "lolzhacker",
            avatarImage: "xxx",
            status: "fdsa",
            profilePage: "https://asdf"
        });
        expect(response.type).toBe(ResponseType.Me);
        expect(response.data).toMatchObject({
            id: "asdf",
            username: "lolzhacker",
            avatarImage: "xxx",
            status: "fdsa",
            profilePage: "https://asdf"
        });
        expect(response.message).toBeUndefined();
    });
});