import MapsetsResponse from '../../responses/MapsetsResponse';
import { ResponseType } from '../../utils/Types';

describe("MapsetsResponse", () => {
    test("Response state", () => {
        let response = new MapsetsResponse({
            mapsets: [
                {
                    id: 1234,
                    title: "lol",
                    maps: []
                }
            ],
            cursor: null,
            total: 1
        });
        expect(response.type).toBe(ResponseType.Mapsets);
        expect(response.data).toMatchObject({
            mapsets: [
                {
                    id: 1234,
                    title: "lol",
                    maps: []
                }
            ],
            cursor: null,
            total: 1
        });
        expect(response.message).toBeUndefined();

        response = new MapsetsResponse({
            mapsets: [
                {
                    id: 111,
                    title: "zamasu",
                    maps: []
                }
            ],
            cursor: {
                _id: "asdf",
                approved_date: "1234567890"
            },
            total: 1
        });
        expect(response.type).toBe(ResponseType.Mapsets);
        expect(response.data).toMatchObject({
            mapsets: [
                {
                    id: 111,
                    title: "zamasu",
                    maps: []
                }
            ],
            cursor: {
                _id: "asdf",
                approved_date: "1234567890"
            },
            total: 1
        });
        expect(response.message).toBeUndefined();
    });
});