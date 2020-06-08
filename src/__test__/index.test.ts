import request from "supertest";
import app from "../app";

describe("index", () => {
    test("Default endpoint", async () => {
        const response = await request(app).get("/");
        expect(response.status).toBe(200);
        expect(response.text).toMatch(/(project-beats-api)/);
    });
});