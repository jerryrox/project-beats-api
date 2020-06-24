import ApiResponse from '../../responses/ApiResponse';
import { ResponseType } from "../../utils/Types";
import { json } from "express";

describe("ApiResponse", () => {
    test("Jsonified response", () => {
        const response = new ApiResponse({
            type: ResponseType.Success,
            data: {
                lol: "z"
            },
            message: "testing"
        });

        const jsonResponse = JSON.parse(JSON.stringify(response));
        expect(jsonResponse.type).toBe(response.type);
        expect(jsonResponse.data).toMatchObject(response.data);
        expect(jsonResponse.message).toBe(response.message);
    });
});